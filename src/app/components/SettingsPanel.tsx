import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../contexts/ThemeContext';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { X, Sun, Moon, Globe, Palette } from 'lucide-react';
import { Switch } from './ui/switch';

export function SettingsPanel({ onClose }: { onClose: () => void }) {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme, colors, updateColors, resetColors } = useTheme();
  const [primaryColor, setPrimaryColor] = useState(colors.primary);
  const [accentColor, setAccentColor] = useState(colors.accent);

  const handleLanguageChange = () => {
    const newLang = i18n.language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLang);
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = newLang;
  };

  const handleSaveColors = () => {
    updateColors({ primary: primaryColor, accent: accentColor });
  };

  const handleReset = () => {
    resetColors();
    setPrimaryColor('#3b82f6');
    setAccentColor('#10b981');
  };

  const presetColors = [
    { name: 'Blue', value: '#3b82f6' },
    { name: 'Purple', value: '#8b5cf6' },
    { name: 'Green', value: '#10b981' },
    { name: 'Red', value: '#ef4444' },
    { name: 'Orange', value: '#f59e0b' },
    { name: 'Pink', value: '#ec4899' },
  ];

  return (
    <div className="w-96 bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            {t('settings.title')}
          </h3>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Language Switcher */}
        <div className="space-y-3">
          <Label className="flex items-center gap-2 text-gray-900 dark:text-white">
            <Globe className="h-4 w-4" />
            {t('settings.language')}
          </Label>
          <Button
            onClick={handleLanguageChange}
            className="w-full rounded-2xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
          >
            {i18n.language === 'en' ? 'العربية' : 'English'}
          </Button>
        </div>

        {/* Theme Switcher */}
        <div className="space-y-3">
          <Label className="flex items-center gap-2 text-gray-900 dark:text-white">
            {theme === 'light' ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
            {t('settings.theme')}
          </Label>
          <div className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100/50 dark:from-gray-700 dark:to-gray-600/50 border border-gray-200 dark:border-gray-600">
            <div className="flex items-center gap-3">
              {theme === 'light' ? (
                <Sun className="h-5 w-5 text-yellow-500" />
              ) : (
                <Moon className="h-5 w-5 text-blue-400" />
              )}
              <span className="font-medium text-gray-900 dark:text-white">
                {theme === 'light'
                  ? t('settings.lightMode')
                  : t('settings.darkMode')}
              </span>
            </div>
            <Switch checked={theme === 'dark'} onCheckedChange={toggleTheme} />
          </div>
        </div>

        {/* Theme Customization */}
        <div className="space-y-3">
          <Label className="flex items-center gap-2 text-gray-900 dark:text-white">
            <Palette className="h-4 w-4" />
            {t('settings.customizeTheme')}
          </Label>

          <div className="space-y-4 p-4 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100/50 dark:from-gray-700 dark:to-gray-600/50 border border-gray-200 dark:border-gray-600">
            {/* Primary Color */}
            <div>
              <Label className="text-sm text-gray-600 dark:text-gray-300 mb-2 block">
                {t('settings.primaryColor')}
              </Label>
              <div className="flex gap-2 mb-2">
                {presetColors.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => setPrimaryColor(color.value)}
                    className={`w-10 h-10 rounded-xl border-2 transition-all ${
                      primaryColor === color.value
                        ? 'border-gray-900 dark:border-white scale-110'
                        : 'border-gray-300 dark:border-gray-600'
                    }`}
                    style={{ backgroundColor: color.value }}
                    title={color.name}
                  />
                ))}
              </div>
              <input
                type="color"
                value={primaryColor}
                onChange={(e) => setPrimaryColor(e.target.value)}
                className="w-full h-12 rounded-xl cursor-pointer"
              />
            </div>

            {/* Accent Color */}
            <div>
              <Label className="text-sm text-gray-600 dark:text-gray-300 mb-2 block">
                {t('settings.accentColor')}
              </Label>
              <div className="flex gap-2 mb-2">
                {presetColors.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => setAccentColor(color.value)}
                    className={`w-10 h-10 rounded-xl border-2 transition-all ${
                      accentColor === color.value
                        ? 'border-gray-900 dark:border-white scale-110'
                        : 'border-gray-300 dark:border-gray-600'
                    }`}
                    style={{ backgroundColor: color.value }}
                    title={color.name}
                  />
                ))}
              </div>
              <input
                type="color"
                value={accentColor}
                onChange={(e) => setAccentColor(e.target.value)}
                className="w-full h-12 rounded-xl cursor-pointer"
              />
            </div>

            <div className="flex gap-2 pt-2">
              <Button
                onClick={handleSaveColors}
                className="flex-1 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
              >
                {t('settings.saveChanges')}
              </Button>
              <Button
                onClick={handleReset}
                variant="outline"
                className="flex-1 rounded-xl"
              >
                {t('settings.resetTheme')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
