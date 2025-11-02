import { useState, useCallback, useEffect } from 'react';
import { useTheme, useColorMode, extendTheme } from '@chakra-ui/react';
import type { TokenDefinition, SemanticTokenDefinition, ThemeConfig } from '../../styled-system/types';

// 定义主题切换器钩子的返回类型
export interface UseThemeSwitcherReturn {
  currentTheme: Partial<TokenDefinition>;
  setCustomTheme: (theme: Partial<TokenDefinition>) => void;
  isTransitioning: boolean;
  resetTheme: () => void;
  mergedTheme: any;
}

// 定义默认主题
const defaultTheme: Partial<TokenDefinition> = {
  colors: {
    primary: {
      50: { value: '#e2e8f0' },
      100: { value: '#cbd5e1' },
      200: { value: '#94a3b8' },
      300: { value: '#64748b' },
      400: { value: '#475569' },
      500: { value: '#334155' },
      600: { value: '#1e293b' },
      700: { value: '#0f172a' },
      800: { value: '#020617' },
    },
    secondary: {
      50: { value: '#f0fdf4' },
      100: { value: '#dcfce7' },
      200: { value: '#bbf7d0' },
      300: { value: '#86efac' },
      400: { value: '#4ade80' },
      500: { value: '#22c55e' },
      600: { value: '#16a34a' },
      700: { value: '#15803d' },
      800: { value: '#166534' },
    },
  },
  fonts: {
    heading: { value: 'Inter, system-ui, sans-serif' },
    body: { value: 'Roboto, system-ui, sans-serif' },
    mono: { value: 'Menlo, monospace' },
  },
  radii: {
    sm: { value: '0.125rem' },
    md: { value: '0.25rem' },
    lg: { value: '0.375rem' },
    xl: { value: '0.5rem' },
    '2xl': { value: '0.75rem' },
    '3xl': { value: '1rem' },
    full: { value: '9999px' },
  },
  shadows: {
    sm: { value: '0 1px 2px 0 rgb(0 0 0 / 0.05)' },
    md: { value: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' },
    lg: { value: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)' },
    xl: { value: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)' },
    '2xl': { value: '0 25px 50px -12px rgb(0 0 0 / 0.25)' },
    outline: { value: '0 0 0 3px rgb(66 153 225 / 0.5)' },
    inner: { value: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)' },
  },
};

// 主题切换器钩子
export const useThemeSwitcher = (initialTheme?: Partial<TokenDefinition>): UseThemeSwitcherReturn => {
  // 获取Chakra UI的主题和颜色模式
  const baseTheme = useTheme();
  const { colorMode } = useColorMode();
  
  // 状态管理
  const [currentTheme, setCurrentTheme] = useState<Partial<TokenDefinition>>(
    initialTheme || defaultTheme
  );
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [mergedTheme, setMergedTheme] = useState<any>(baseTheme);

  // 合并主题函数
  const mergeThemes = useCallback((customTheme: Partial<TokenDefinition>): any => {
    // 创建一个新的主题，合并基础主题和自定义主题
    const merged = extendTheme({
      ...baseTheme,
      tokens: {
        ...baseTheme.tokens,
        ...customTheme,
      },
    });
    
    return merged;
  }, [baseTheme]);

  // 应用自定义主题
  const setCustomTheme = useCallback((theme: Partial<TokenDefinition>) => {
    setIsTransitioning(true);
    setCurrentTheme(theme);
    
    // 应用过渡动画
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 300); // 过渡时间应与CSS过渡时间匹配
    
    return () => clearTimeout(timer);
  }, []);

  // 重置主题
  const resetTheme = useCallback(() => {
    setCustomTheme(defaultTheme);
  }, [setCustomTheme]);

  // 当自定义主题变化时，更新合并后的主题
  useEffect(() => {
    const merged = mergeThemes(currentTheme);
    setMergedTheme(merged);
  }, [currentTheme, mergeThemes]);

  return {
    currentTheme,
    setCustomTheme,
    isTransitioning,
    resetTheme,
    mergedTheme,
  };
};

export default useThemeSwitcher;