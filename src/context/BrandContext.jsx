import React, { createContext, useContext, useState } from 'react';
import { doc, setDoc } from 'firebase/firestore';
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
      await setDoc(doc(db, "brand_briefs", currentUser.uid), {
        ...data,
        updatedAt: new Date()
      }, { merge: true });
    } catch (error) {
      console.error("Error saving brand brief:", error);
    }
  };

  const resetBrandBrief = () => {
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
    updateBrandBrief,
    resetBrandBrief,
    saveToFirestore
  };

  return (
    <BrandContext.Provider value={value}>
      {children}
    </BrandContext.Provider>
  );
};
