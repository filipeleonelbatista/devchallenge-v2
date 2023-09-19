/* eslint-disable no-restricted-globals */
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";
import { db, storage } from "../services/firebase-config";

export function deleteImageFromStorage(imagePath: string) {
  if (!imagePath) return;

  const imageRef = ref(storage, imagePath);

  return deleteObject(imageRef)
    .then(() => {
      return true;
    })
    .catch((error) => {
      console.log("deleteImageFromStorage error", error);
      return false;
    });
}

export async function uploadImageAsync(file: File, path: string) {
  if (!file) return;

  const storageRef = ref(
    storage,
    `/${path}/${Date.now()}-${encodeURI(file.name)}`
  );
  await uploadBytesResumable(storageRef, file);

  return getDownloadURL(storageRef);
}

interface ChallengesContextProviderProps {
  children: ReactNode;
}

export interface Challenge {
  id: string;
  type: string;
  level: string;
  techs: string[];
  githubRepository: string;
  username: string;
  background: string;
  name: string;
  description: string;
  createdAt: number;
  active: boolean;
}

interface ChallengesContextType {
  challengesList: Challenge[];
  selectedChallenge: Challenge | null;
  setSelectedChallenge: (challenge: Challenge | null) => void;
  updateChallengesList: () => Promise<void>;
  handleDeleteChallenge: (id: string) => Promise<void>;
  addChallenge: (data: Challenge) => Promise<void>;
  updateChallenge: (data: Challenge) => Promise<void>;
  getChallengeByID: (id: string) => Promise<Challenge | undefined>;
}

export const ChallengesContext = createContext<ChallengesContextType>({
  challengesList: [],
  selectedChallenge: null,
  setSelectedChallenge: () => {},
  updateChallengesList: () => Promise.resolve(),
  handleDeleteChallenge: () => Promise.resolve(),
  addChallenge: () => Promise.resolve(),
  updateChallenge: () => Promise.resolve(),
  getChallengeByID: () => Promise.resolve(undefined),
});

export function ChallengesContextProvider(
  props: ChallengesContextProviderProps
) {
  const [challengesList, setChallengesList] = useState<Challenge[]>([]);
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(
    null
  );

  async function getAllChallenges() {
    const contactsRef = collection(db, "challenges");
    const result = getDocs(query(contactsRef, orderBy("createdAt", "desc")))
      .then((snap) => {
        let currentChallegeList = [] as Challenge[];
        snap.docs.forEach((doc) => {
          const challengeData = doc.data();
          const challenge: Challenge = {
            id: doc.id,
            type: challengeData.type || "",
            level: challengeData.level || "",
            techs: challengeData.techs || [],
            githubRepository: challengeData.githubRepository || "",
            username: challengeData.username || "",
            background: challengeData.background || "",
            name: challengeData.name || "",
            description: challengeData.description || "",
            createdAt: challengeData.createdAt || 0,
            active: challengeData.active || false,
          };
          currentChallegeList.push(challenge);
        });
        return currentChallegeList;
      })
      .catch((error) => {
        console.log("getAllChallenges error", error);
        return [];
      });

    return result;
  }

  async function getChallengeByID(id: string) {
    const challengeRef = doc(db, "challenges", id);
    const challengeSnap = await getDoc(challengeRef);
    if (challengeSnap.exists()) {
      const challengeData = challengeSnap.data() as Challenge;
      return { ...challengeData, id };
    } else {
      return undefined;
    }
  }

  async function updateChallenge(data: Challenge) {
    await setDoc(doc(db, "challenges", data.id), data);

    await updateChallengesList();
  }

  async function addChallenge(data: Challenge) {
    // const challengeRef = collection(db, "challenges");
    // await addDoc(challengeRef, data);
    const challengeRef = doc(db, "challenges", data.id);
    await setDoc(challengeRef, data);

    await updateChallengesList();
  }

  async function handleDeleteChallenge(id: string) {
    const response = confirm(
      "Deseja realmente deletar esse registro? Esta ação é irreverssível"
    );
    if (response) {
      const challenge = await getChallengeByID(id);
      if (challenge) {
        deleteImageFromStorage(challenge.background);
        await deleteDoc(doc(db, "challenges", id));
      }
    }
    await updateChallengesList();
  }

  const updateChallengesList = useCallback(async () => {
    const response = await getAllChallenges();
    setChallengesList(response);
  }, []);

  useEffect(() => {
    const executeAsync = async () => {
      await updateChallengesList();
    };
    executeAsync();
  }, [updateChallengesList]);

  return (
    <ChallengesContext.Provider
      value={{
        challengesList,
        selectedChallenge,
        setSelectedChallenge,
        updateChallengesList,
        handleDeleteChallenge,
        addChallenge,
        updateChallenge,
        getChallengeByID,
      }}
    >
      {props.children}
    </ChallengesContext.Provider>
  );
}
