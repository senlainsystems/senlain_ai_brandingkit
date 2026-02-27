import React, { createContext, useContext, useState } from 'react';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from 'lib/firebase';
import { useAuth } from './AuthContext';

const BrandContext = createContext();

export const useBrandContext = () => {
  const context = useContext(BrandContext);
  if (!context) {
    throw new Error('useBrandContext must be used within a BrandProvider');
  }
  return context;
};

export const BrandProvider = ({ children }) => {
  const [brandBrief, setBrandBrief] = useState({
    basicInfo: {
      businessName: '',
      industry: '',
      businessDescription: '',
      isNameAvailable: null
    },
    visualPreferences: {
      colorPalette: [],
      moodBoard: [],
      stylePreferences: {
        modernClassic: 'modern',
        boldSubtle: 'bold',
        playfulProfessional: 'professional'
      }
    },
    targetAudience: {
      demographics: {
        ageRange: '25-34',
        gender: 'all',
        location: 'global',
        income: 'middle'
      },
      brandPersonality: {
        innovative: 7,
        trustworthy: 8,
        friendly: 6,
        professional: 9,
        creative: 7
      }
    },
    generatedAssets: {
      names: [],
      nameRationale: '',
      taglines: [],
      mission: '',
      values: [],
      colors: [],
      typography: '',
      visualStyle: '',
      logoUrl: ''
    }
  });

  const [currentBrandId, setCurrentBrandId] = useState(null);
  const { currentUser } = useAuth();

  const updateBrandBrief = (section, data) => {
    setBrandBrief(prev => {
      const newState = {
        ...prev,
        [section]: { ...prev[section], ...data }
      };

      // Auto-save to Firestore if user is logged in
      if (currentUser) {
        saveToFirestore(newState);
      }

      return newState;
    });
  };

  const saveToFirestore = async (data) => {
    if (!currentUser) return;
    try {
      const brandData = {
        ...data,
        userId: currentUser.uid,
        updatedAt: new Date()
      };

      if (currentBrandId) {
        await setDoc(doc(db, "brand_kits", currentBrandId), brandData, { merge: true });
      } else {
        // If no ID, we might want to create one or wait for explicit save
        // For now, let's just use doc(db, "brand_kits", currentUser.uid) as a fallback 
        // OR better, don't auto-save if no ID yet (first creation)
        console.log("No currentBrandId, skipping auto-save to collection.");
      }
    } catch (error) {
      console.error("Error saving brand kit:", error);
    }
  };

  const loadBrandKit = async (brandId) => {
    if (!currentUser) return;
    try {
      const docRef = doc(db, "brand_kits", brandId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        // Convert Firestore timestamps to Dates if needed
        setBrandBrief(data);
        setCurrentBrandId(brandId);
        return data;
      }
    } catch (error) {
      console.error("Error loading brand kit:", error);
    }
  };

  const resetBrandBrief = () => {
    setCurrentBrandId(null);
    setBrandBrief({
      basicInfo: {
        businessName: '',
        industry: '',
        businessDescription: '',
        isNameAvailable: null
      },
      visualPreferences: {
        colorPalette: [],
        moodBoard: [],
        stylePreferences: {
          modernClassic: 'modern',
          boldSubtle: 'bold',
          playfulProfessional: 'professional'
        }
      },
      targetAudience: {
        demographics: {
          ageRange: '25-34',
          gender: 'all',
          location: 'global',
          income: 'middle'
        },
        brandPersonality: {
          innovative: 7,
          trustworthy: 8,
          friendly: 6,
          professional: 9,
          creative: 7
        }
      }
    });
  };

  const value = {
    brandBrief,
    setBrandBrief,
    updateBrandBrief,
    resetBrandBrief,
    saveToFirestore,
    currentBrandId,
    setCurrentBrandId,
    loadBrandKit
  };

  return (
    <BrandContext.Provider value={value}>
      {children}
    </BrandContext.Provider>
  );
};
