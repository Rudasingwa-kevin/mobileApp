import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Modal, StyleProp, ViewStyle } from 'react-native';
import { Text, RadioButton } from 'react-native-paper';
import { usePreferences, Language } from '../store/preferences';
import { useTranslation } from 'react-i18next';
import { colors, spacing, borderRadius } from '../theme';

interface LanguageSwitcherProps {
  style?: StyleProp<ViewStyle>;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ style }) => {
  const { language, setLanguage } = usePreferences();
  const { t } = useTranslation();
  const [modalVisible, setModalVisible] = useState(false);

  // Languages available in the app
  const languages = [
    { code: 'fr', label: t('languages.fr'), flag: '🇫🇷' },
    { code: 'en', label: t('languages.en'), flag: '🇬🇧' },
    { code: 'rw', label: t('languages.rw'), flag: '🇷🇼' },
    { code: 'sw', label: t('languages.sw'), flag: '🇹🇿' },
  ];

  // Get current language flag
  const getCurrentFlag = () => {
    const currentLang = languages.find(lang => lang.code === language);
    return currentLang ? currentLang.flag : '🌐';
  };

  // Change the language
  const handleLanguageChange = async (value: Language) => {
    await setLanguage(value);
    setModalVisible(false);
  };

  return (
    <>
      <TouchableOpacity
        style={[styles.languageButton, style]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.flagText}>{getCurrentFlag()}</Text>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setModalVisible(false)}
        >
          <View style={styles.modalContent} onStartShouldSetResponder={() => true}>
            <Text style={styles.modalTitle}>{t('preferences.chooseLanguage')}</Text>
            
            <RadioButton.Group
              onValueChange={value => handleLanguageChange(value as Language)}
              value={language}
            >
              {languages.map(lang => (
                <TouchableOpacity
                  key={lang.code}
                  style={styles.languageOption}
                  onPress={() => handleLanguageChange(lang.code as Language)}
                >
                  <Text style={styles.languageFlag}>{lang.flag}</Text>
                  <Text style={styles.languageLabel}>{lang.label}</Text>
                  <RadioButton value={lang.code} />
                </TouchableOpacity>
              ))}
            </RadioButton.Group>
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  languageButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.gray[400],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  flagText: {
    fontSize: 18,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing[4],
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: spacing[4],
    textAlign: 'center',
    color: colors.gray[800],
  },
  languageOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing[2],
  },
  languageFlag: {
    fontSize: 20,
    marginRight: spacing[2],
  },
  languageLabel: {
    flex: 1,
    fontSize: 16,
    color: colors.gray[800],
  },
});

export default LanguageSwitcher; 