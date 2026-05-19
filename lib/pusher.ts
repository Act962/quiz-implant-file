import { Pusher, type PusherEvent } from '@pusher/pusher-websocket-react-native';

const KEY = process.env.EXPO_PUBLIC_PUSHER_KEY;
const CLUSTER = process.env.EXPO_PUBLIC_PUSHER_CLUSTER;

const QUESTIONS_UPDATED_EVENT = 'questions:updated';

type Listener = () => void;
const listenersByChannel = new Map<string, Set<Listener>>();

let pusher: Pusher | null = null;
let initPromise: Promise<Pusher | null> | null = null;

function channelName(quizId: string): string {
  return `quiz-${quizId}`;
}

async function ensureInitialized(): Promise<Pusher | null> {
  if (!KEY || !CLUSTER) {
    console.warn('[pusher] EXPO_PUBLIC_PUSHER_KEY/CLUSTER ausentes — modo somente REST');
    return null;
  }
  if (pusher) return pusher;
  if (initPromise) return initPromise;

  initPromise = (async () => {
    const instance = Pusher.getInstance();
    await instance.init({
      apiKey: KEY,
      cluster: CLUSTER,
      onEvent: (event: PusherEvent) => {
        if (event.eventName !== QUESTIONS_UPDATED_EVENT) return;
        const set = listenersByChannel.get(event.channelName);
        if (set) set.forEach((fn) => fn());
      },
    });
    await instance.connect();
    pusher = instance;
    return instance;
  })();

  try {
    return await initPromise;
  } catch (err) {
    console.warn('[pusher] falha ao inicializar', err);
    initPromise = null;
    return null;
  }
}

export function subscribeQuestionsUpdated(quizId: string, listener: Listener): () => void {
  const channel = channelName(quizId);
  let cancelled = false;

  const set = listenersByChannel.get(channel) ?? new Set<Listener>();
  set.add(listener);
  listenersByChannel.set(channel, set);

  (async () => {
    const instance = await ensureInitialized();
    if (cancelled || !instance) return;
    try {
      await instance.subscribe({ channelName: channel });
    } catch (err) {
      console.warn(`[pusher] falha ao subscrever ${channel}`, err);
    }
  })();

  return () => {
    cancelled = true;
    const current = listenersByChannel.get(channel);
    if (!current) return;
    current.delete(listener);
    if (current.size === 0) {
      listenersByChannel.delete(channel);
      pusher?.unsubscribe({ channelName: channel }).catch(() => {});
    }
  };
}

export async function disconnectPusher(): Promise<void> {
  if (!pusher) return;
  try {
    await pusher.disconnect();
  } finally {
    pusher = null;
    initPromise = null;
    listenersByChannel.clear();
  }
}
