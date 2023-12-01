import { initializeApp } from 'firebase/app';
import { addDoc, collection, doc, getDoc, getDocs, getFirestore, setDoc, Timestamp } from 'firebase/firestore';
import { Post } from '../types/profile';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, signOut, User } from "firebase/auth";
import firebaseConfig from '../../firebaseConfig';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

const defaultIcons = [
  "Random1.jpg",
  "Random2.jpg",
  "Random3.jpg",
  "Random4.jpg",
  "Random5.jpg",
  "Random6.jpg",
  "Random7.jpg",
  "Random8.jpg",
  "Random9.jpg",
  "Random10.jpg",
  "Random11.jpg",
  "Random12.jpg",
];

interface Comment {
  userId: string;
  name: string;
  icon: string;
  text: string;
}

const addPosts = async (post: Omit<Post, "id">) => {
  try {
    const where = collection(db, "posts");
    await addDoc(where, post);
    console.log("Se añadió");
  } catch (error) {
    console.error(error);
  }
};

const getPosts = async () => {
  const querySnapshot = await getDocs(collection(db, "posts"));
  const transformed: Array<Post> = [];

  querySnapshot.forEach((doc) => {
    const data: Omit<Post, "id"> = doc.data() as any;
    transformed.push({
      id: doc.id,
      ...data
    });
  });

  return transformed;
};

const createUser = async (email: string, password: string, name: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    const randomIconIndex = Math.floor(Math.random() * defaultIcons.length);
    const selectedIcon = defaultIcons[randomIconIndex];

    await updateProfile(user, {
      displayName: name,
      photoURL: selectedIcon,
    });

    try {
      const userDocRef = doc(db, 'users', user.uid);
      const userData: Omit<Post, "id"> = {
        name: name,
        email: email,
        password: password,
        icon: selectedIcon,
      };

      await setDoc(userDocRef, userData);
      console.log('User data added successfully');
    } catch (error) {
      console.error('Error adding user data:', error);
    }
  } catch (error: any) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error(errorMessage);
  }
};

const getCurrentUserFromFirestore = async (): Promise<Post | null> => {
  const currentUser = getCurrentUser();

  if (currentUser) {
    const userDocRef = doc(db, 'users', currentUser.uid);
    const userDocSnapshot = await getDoc(userDocRef);

    if (userDocSnapshot.exists()) {
      const userData = userDocSnapshot.data();
      return userData as Post;
    }
  }

  return null;
};

const logIn = async (email: string, password: string): Promise<boolean> => {
  try {
    if (!email || !password) {
      console.error("Por favor, complete todos los campos.");
      return false;
    }

    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log(user.uid);
    return true;
  } catch (error: any) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error(errorMessage);
    throw error;
  }
};

const logOut = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
  }
};

const getCurrentUser = (): User | null => {
  return auth.currentUser;
};

const getTimestamp = (): Timestamp => {
  return Timestamp.now();
};



const addVideoComment = async (videoId: string, comment: Comment) => {
  try {
    const userData = await getUserData(comment.userId);
    const commentWithUserData = {
      ...comment,
      name: userData.name,
      icon: userData.icon,
    };

    const where = collection(db, `videos/${videoId}/comments`);
    await addDoc(where, commentWithUserData);

    console.log("Comentario añadido exitosamente");
  } catch (error) {
    console.error("Error al añadir comentario:", error);
    throw error;
  }
};



const fetchVideoComments = async (videoId: string) => {
  try {
    const querySnapshot = await getDocs(collection(db, `videos/${videoId}/comments`));
    const transformed: Comment[] = [];

    for (const doc of querySnapshot.docs) {
      const data = doc.data();

      transformed.push({
        userId: data.userId,
        name: data.name,
        icon: data.icon, 
        text: data.text,
      });
    }

    return transformed;
  } catch (error) {
    console.error('Error al recuperar comentarios:', error);
    throw error;
  }
};

const getUserData = async (userId: string) => {
  try {
    const userDocRef = doc(db, 'users', userId);
    const userDocSnapshot = await getDoc(userDocRef);

    if (userDocSnapshot.exists()) {
      const userData = userDocSnapshot.data();
      return userData as { name: string; icon: string };
    } else {
      console.error('Usuario no encontrado');
      return { name: 'Usuario Desconocido', icon: '' };
    }
  } catch (error) {
    console.error(`Error al obtener datos del usuario (${userId}):`, error);
    return { name: 'Error al obtener datos', icon: '' };
  }
};


export default {
  addPosts,
  getPosts,
  createUser,
  logIn,
  getCurrentUser,
  getTimestamp,
  getCurrentUserFromFirestore,
  logOut,
  fetchVideoComments,
  addVideoComment,
  getUserData,
};
