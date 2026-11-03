import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import type {
  CreateTaskInput,
  Task,
  TaskSnapshotCallback,
  TaskSnapshotErrorCallback,
  TaskSubscription,
  UpdateTaskInput,
} from '../types/models';
import type { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

function isCategoryId(value: unknown): value is Task['category'] {
  return (
    value === 'trabalho' ||
    value === 'estudos' ||
    value === 'saude' ||
    value === 'lazer' ||
    value === 'descanso'
  );
}

function readTask(
  document: FirebaseFirestoreTypes.QueryDocumentSnapshot,
): Task | null {
  const data: unknown = document.data();
  if (
    typeof data !== 'object' ||
    data === null ||
    !('title' in data) ||
    typeof data.title !== 'string' ||
    !('date' in data) ||
    typeof data.date !== 'string' ||
    !('hour' in data) ||
    typeof data.hour !== 'string' ||
    !('category' in data) ||
    !isCategoryId(data.category) ||
    !('recurring' in data) ||
    typeof data.recurring !== 'boolean' ||
    !('completed' in data) ||
    typeof data.completed !== 'boolean' ||
    !('userId' in data) ||
    typeof data.userId !== 'string'
  ) {
    return null;
  }
  const createdAt = 'createdAt' in data ? data.createdAt ?? null : null;
  if (createdAt !== null && !(createdAt instanceof firestore.Timestamp)) {
    return null;
  }
  return {
    id: document.id,
    title: data.title,
    date: data.date,
    hour: data.hour,
    category: data.category,
    recurring: data.recurring,
    completed: data.completed,
    userId: data.userId,
    createdAt,
  };
}

function getTasksCollection() {
  const currentUser = auth().currentUser;
  if (!currentUser) {
    return null;
  }
  return {
    uid: currentUser.uid,
    collection: firestore()
      .collection('users')
      .doc(currentUser.uid)
      .collection('tasks'),
  };
}

export async function createTask(task: CreateTaskInput): Promise<boolean> {
  const tasks = getTasksCollection();
  if (!tasks) {
    return false;
  }
  await tasks.collection.add({
    title: task.title,
    date: task.date,
    hour: task.hour,
    category: task.category,
    recurring: task.recurring,
    completed: false,
    userId: tasks.uid,
    createdAt: firestore.FieldValue.serverTimestamp(),
  });
  return true;
}

export function subscribeToTasks(
  onTasks: TaskSnapshotCallback,
  onError: TaskSnapshotErrorCallback,
): TaskSubscription {
  const tasks = getTasksCollection();
  if (!tasks) {
    return () => {};
  }
  return tasks.collection.onSnapshot(snapshot => {
    const taskList: Task[] = [];
    for (const document of snapshot.docs) {
      const task = readTask(document);
      if (!task) {
        onError(new Error('Uma tarefa possui formato inválido no Firestore.'));
        return;
      }
      taskList.push(task);
    }
    onTasks(taskList);
  }, onError);
}

export async function updateTask(
  taskId: string,
  changes: UpdateTaskInput,
): Promise<void> {
  const tasks = getTasksCollection();
  if (!tasks) {
    return;
  }
  await tasks.collection.doc(taskId).update(changes);
}

export async function deleteTask(taskId: string): Promise<void> {
  const tasks = getTasksCollection();
  if (!tasks) {
    return;
  }
  await tasks.collection.doc(taskId).delete();
}
