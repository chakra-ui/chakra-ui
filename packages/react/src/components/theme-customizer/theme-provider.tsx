import { ReactNode, createContext, useContext } from 'react';
import { ChakraProvider as BaseChakraProvider } from '../../styled-system/provider';
import { useThemeSwitcher } from './use-theme-switcher';
import type { TokenDefinition } from '../../styled-system/types';

// 定义主题提供器的Props
interface ThemeProviderProps {
  children: ReactNode;
  initialTheme?: Partial<TokenDefinition>;
  onThemeChange?: (theme: Partial<TokenDefinition>) => void;
}

// 创建主题上下文
interface ThemeContextType {
  currentTheme: Partial<TokenDefinition>;
  setCustomTheme: (theme: Partial<TokenDefinition>) => void;
  isTransitioning: boolean;
  resetTheme: () => void;
  exportTheme: (format: 'json' | 'css') => void;
  importTheme: (file: File) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// 主题提供器组件
export const ThemeProvider = ({ children, initialTheme, onThemeChange }: ThemeProviderProps) => {
  // 使用主题切换器钩子
  const { currentTheme, setCustomTheme, isTransitioning, resetTheme, mergedTheme } = useThemeSwitcher(initialTheme);

  // 处理主题变化
  const handleThemeChange = (theme: Partial<TokenDefinition>) => {
    setCustomTheme(theme);
    onThemeChange?.(theme);
  };

  // 导出主题
  const exportTheme = (format: 'json' | 'css') => {
    let output = '';
    
    if (format === 'json') {
      output = JSON.stringify(currentTheme, null, 2);
    } else {
      // 生成CSS变量
      let cssVariables = ':root {\n';
      
      // 添加颜色变量
      if (currentTheme.colors) {
        Object.entries(currentTheme.colors).forEach(([key, value]) => {
          if (typeof value === 'object' && value !== null) {
            if ('value' in value) {
              // 单色值
              cssVariables += `  --chakra-colors-${key}: ${value.value};\n`;
            } else {
              // 颜色范围
              Object.entries(value).forEach(([shade, shadeValue]) => {
                if (typeof shadeValue === 'object' && shadeValue !== null && 'value' in shadeValue) {
                  cssVariables += `  --chakra-colors-${key}-${shade}: ${shadeValue.value};\n`;
                }
              });
            }
          }
        });
      }
      
      // 添加字体变量
      if (currentTheme.fonts) {
        Object.entries(currentTheme.fonts).forEach(([key, value]) => {
          if (typeof value === 'object' && value !== null && 'value' in value) {
            cssVariables += `  --chakra-fonts-${key}: ${value.value};\n`;
          }
        });
      }
      
      // 添加圆角变量
      if (currentTheme.radii) {
        Object.entries(currentTheme.radii).forEach(([key, value]) => {
          if (typeof value === 'object' && value !== null && 'value' in value) {
            cssVariables += `  --chakra-radii-${key}: ${value.value};\n`;
          }
        });
      }
      
      // 添加阴影变量
      if (currentTheme.shadows) {
        Object.entries(currentTheme.shadows).forEach(([key, value]) => {
          if (typeof value === 'object' && value !== null && 'value' in value) {
            cssVariables += `  --chakra-shadows-${key}: ${value.value};\n`;
          }
        });
      }
      
      cssVariables += '}';
      output = cssVariables;
    }
    
    // 创建下载链接
    const blob = new Blob([output], { type: format === 'json' ? 'application/json' : 'text/css' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `chakra-theme.${format}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // 导入主题
  const importTheme = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        if (e.target?.result) {
          const importedTheme = JSON.parse(e.target.result as string);
          setCustomTheme(importedTheme);
        }
      } catch (error) {
        console.error('Failed to import theme:', error);
      }
    };
    reader.readAsText(file);
  };

  // 提供上下文值
  const contextValue: ThemeContextType = {
    currentTheme,
    setCustomTheme: handleThemeChange,
    isTransitioning,
    resetTheme,
    exportTheme,
    importTheme,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      <BaseChakraProvider value={mergedTheme}>
        {children}
      </BaseChakraProvider>
    </ThemeContext.Provider>
  );
};

// 自定义钩子，用于访问主题上下文
export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeProvider;