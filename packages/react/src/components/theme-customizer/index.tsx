import { Box, Card, CardBody, CardHeader, Heading, Text, Flex, Button, Input, Select, Slider, SliderTrack, SliderFilledTrack, SliderThumb, FormControl, FormLabel, FormHelperText, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure, useColorModeValue, Tabs, TabList, TabPanels, Tab, TabPanel, Switch, Divider, Avatar, Tooltip } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { IoMdAdd, IoMdTrash, IoMdEdit, IoMdSettings, IoMdDownload, IoMdUpload, IoMdCheckmarkCircle, IoMdAlertCircle, IoMdColorPalette, IoMdFont, IoMdSettingsOutline, IoMdShuffle, IoMdSave, IoMdRestore } from 'react-icons/io';
import type { TokenCategory, TokenDefinition, SemanticTokenDefinition } from '../../styled-system/types';
import { useThemeContext } from './theme-provider';

// 定义主题定制器Props
export interface ThemeCustomizerProps {
  showPreview?: boolean;
  previewComponent?: React.ReactNode;
}

// 定义颜色项类型
interface ColorItem {
  id: string;
  name: string;
  value: string;
  isDark?: boolean;
}

// 定义字体项类型
interface FontItem {
  id: string;
  name: string;
  value: string;
}

// 定义圆角项类型
interface RadiusItem {
  id: string;
  name: string;
  value: string;
}

// 定义阴影项类型
interface ShadowItem {
  id: string;
  name: string;
  value: string;
}

// 主题定制器组件
export const ThemeCustomizer = ({ 
  showPreview = true,
  previewComponent
}: ThemeCustomizerProps) => {
  // 使用主题上下文
  const { currentTheme, setCustomTheme, resetTheme, exportTheme, importTheme } = useThemeContext();
  
  // 状态管理
  const [colors, setColors] = useState<ColorItem[]>([]);
  const [fonts, setFonts] = useState<FontItem[]>([]);
  const [radii, setRadii] = useState<RadiusItem[]>([]);
  const [shadows, setShadows] = useState<ShadowItem[]>([]);
  const [showImportModal, setShowImportModal] = useState(false);
  const [importFile, setImportFile] = useState<File | null>(null);
  const [showExportModal, setShowExportModal] = useState(false);
  const [exportFormat, setExportFormat] = useState<'json' | 'css'>('json');
  const [showResetModal, setShowResetModal] = useState(false);
  const [transitionDuration, setTransitionDuration] = useState(300);

  // 从currentTheme中提取颜色、字体、圆角和阴影
  useEffect(() => {
    if (!currentTheme) return;
    
    // 提取颜色
    if (currentTheme.colors) {
      const colorItems: ColorItem[] = [];
      Object.entries(currentTheme.colors).forEach(([key, value]) => {
        if (typeof value === 'object' && value !== null) {
          if ('value' in value) {
            // 单色值
            colorItems.push({ id: key, name: key, value: value.value });
          } else {
            // 颜色范围
            Object.entries(value).forEach(([shade, shadeValue]) => {
              if (typeof shadeValue === 'object' && shadeValue !== null && 'value' in shadeValue) {
                colorItems.push({ id: `${key}-${shade}`, name: `${key} ${shade}`, value: shadeValue.value });
              }
            });
          }
        }
      });
      setColors(colorItems);
    }
    
    // 提取字体
    if (currentTheme.fonts) {
      const fontItems: FontItem[] = [];
      Object.entries(currentTheme.fonts).forEach(([key, value]) => {
        if (typeof value === 'object' && value !== null && 'value' in value) {
          fontItems.push({ id: key, name: key, value: value.value });
        }
      });
      setFonts(fontItems);
    }
    
    // 提取圆角
    if (currentTheme.radii) {
      const radiusItems: RadiusItem[] = [];
      Object.entries(currentTheme.radii).forEach(([key, value]) => {
        if (typeof value === 'object' && value !== null && 'value' in value) {
          radiusItems.push({ id: key, name: key, value: value.value });
        }
      });
      setRadii(radiusItems);
    }
    
    // 提取阴影
    if (currentTheme.shadows) {
      const shadowItems: ShadowItem[] = [];
      Object.entries(currentTheme.shadows).forEach(([key, value]) => {
        if (typeof value === 'object' && value !== null && 'value' in value) {
          shadowItems.push({ id: key, name: key, value: value.value });
        }
      });
      setShadows(shadowItems);
    }
  }, [currentTheme]);

  // 更新当前主题
  useEffect(() => {
    const theme: Partial<TokenDefinition> = {};
    
    // 构建颜色主题
    if (colors.length > 0) {
      theme.colors = {};
      colors.forEach(color => {
        // 检查颜色是否属于某个范围
        const parts = color.id.split('-');
        if (parts.length === 2) {
          const [colorName, shade] = parts;
          if (!theme.colors![colorName]) {
            theme.colors![colorName] = {};
          }
          theme.colors![colorName][shade] = { value: color.value };
        } else {
          theme.colors![color.id] = { value: color.value };
        }
      });
    }
    
    // 构建字体主题
    if (fonts.length > 0) {
      theme.fonts = {};
      fonts.forEach(font => {
        theme.fonts![font.id] = { value: font.value };
      });
    }
    
    // 构建圆角主题
    if (radii.length > 0) {
      theme.radii = {};
      radii.forEach(radius => {
        theme.radii![radius.id] = { value: radius.value };
      });
    }
    
    // 构建阴影主题
    if (shadows.length > 0) {
      theme.shadows = {};
      shadows.forEach(shadow => {
        theme.shadows![shadow.id] = { value: shadow.value };
      });
    }
    
    // 仅当主题有变化时才更新
    if (Object.keys(theme).length > 0) {
      setCustomTheme(theme);
    }
  }, [colors, fonts, radii, shadows, setCustomTheme]);

  // 处理颜色变化
  const handleColorChange = (id: string, value: string) => {
    setColors(colors.map(color => 
      color.id === id ? { ...color, value } : color
    ));
  };

  // 处理字体变化
  const handleFontChange = (id: string, value: string) => {
    setFonts(fonts.map(font => 
      font.id === id ? { ...font, value } : font
    ));
  };

  // 处理圆角变化
  const handleRadiusChange = (id: string, value: string) => {
    setRadii(radii.map(radius => 
      radius.id === id ? { ...radius, value } : radius
    ));
  };

  // 处理阴影变化
  const handleShadowChange = (id: string, value: string) => {
    setShadows(shadows.map(shadow => 
      shadow.id === id ? { ...shadow, value } : shadow
    ));
  };

  // 处理添加颜色
  const handleAddColor = () => {
    const newColor: ColorItem = {
      id: `custom-${Date.now()}`,
      name: `Custom Color ${Date.now().toString().slice(-4)}`,
      value: '#000000'
    };
    setColors([...colors, newColor]);
  };

  // 处理删除颜色
  const handleDeleteColor = (id: string) => {
    setColors(colors.filter(color => color.id !== id));
  };

  // 处理导入主题
  const handleImportTheme = () => {
    if (!importFile) return;
    
    importTheme(importFile);
    setShowImportModal(false);
    setImportFile(null);
  };

  // 处理导出主题
  const handleExportTheme = () => {
    exportTheme(exportFormat);
    setShowExportModal(false);
  };

  // 处理重置主题
  const handleResetTheme = () => {
    resetTheme();
    setShowResetModal(false);
  };

  // 预览组件
  const DefaultPreviewComponent = () => (
    <Box p={6} bg={useColorModeValue('gray.50', 'gray.800')} borderRadius="lg">
      <Flex justifyContent="space-between" mb={4}>
        <Avatar name="John Doe" src="https://picsum.photos/seed/john/100" size="lg" />
        <Flex gap={2}>
          <Button colorScheme="primary">Primary</Button>
          <Button colorScheme="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
        </Flex>
      </Flex>
      
      <Box mb={4}>
        <Heading size="xl" mb={2}>Welcome to Chakra UI</Heading>
        <Text fontSize="lg" color="text.secondary">
          This is a preview of your custom theme. The colors, fonts, rounded corners, and shadows you customize will be applied here.
        </Text>
      </Box>
      
      <Flex gap={4} mb={4} flexWrap="wrap">
        <Card shadow="lg" borderRadius="xl">
          <CardBody>
            <Text fontWeight="bold">Card 1</Text>
            <Text>This card demonstrates the shadow and border radius of your theme.</Text>
          </CardBody>
        </Card>
        <Card shadow="lg" borderRadius="xl">
          <CardBody>
            <Text fontWeight="bold">Card 2</Text>
            <Text>This card demonstrates the shadow and border radius of your theme.</Text>
          </CardBody>
        </Card>
        <Card shadow="lg" borderRadius="xl">
          <CardBody>
            <Text fontWeight="bold">Card 3</Text>
            <Text>This card demonstrates the shadow and border radius of your theme.</Text>
          </CardBody>
        </Card>
      </Flex>
      
      <FormControl mb={4}>
        <FormLabel>Example Input</FormLabel>
        <Input placeholder="Enter some text" />
      </FormControl>
      
      <FormControl mb={4}>
        <FormLabel>Example Select</FormLabel>
        <Select placeholder="Select an option">
          <option value="1">Option 1</option>
          <option value="2">Option 2</option>
          <option value="3">Option 3</option>
        </Select>
      </FormControl>
      
      <Slider defaultValue={50}>
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </Slider>
    </Box>
  );

  return (
    <Box>
      <Card>
        <CardHeader>
          <Flex justifyContent="space-between" alignItems="center">
            <Flex alignItems="center">
              <IoMdColorPalette size={24} mr={2} />
              <Heading size="lg">Theme Customizer</Heading>
            </Flex>
            <Flex gap={2}>
              <Tooltip label="Export Theme">
                <Button 
                  leftIcon={<IoMdDownload />}
                  onClick={() => setShowExportModal(true)}
                >
                  Export
                </Button>
              </Tooltip>
              <Tooltip label="Import Theme">
                <Button 
                  leftIcon={<IoMdUpload />}
                  onClick={() => setShowImportModal(true)}
                >
                  Import
                </Button>
              </Tooltip>
              <Tooltip label="Reset to Default">
                <Button 
                  leftIcon={<IoMdRestore />}
                  colorScheme="red"
                  onClick={() => setShowResetModal(true)}
                >
                  Reset
                </Button>
              </Tooltip>
            </Flex>
          </Flex>
        </CardHeader>
        <CardBody>
          <Tabs variant="enclosed" colorScheme="blue">
            <TabList mb={6}>
              <Tab icon={<IoMdColorPalette />}>Colors</Tab>
              <Tab icon={<IoMdFont />}>Fonts</Tab>
              <Tab icon={<IoMdSettingsOutline />}>Radii</Tab>
              <Tab icon={<IoMdShuffle />}>Shadows</Tab>
              <Tab icon={<IoMdSettings />}>Settings</Tab>
            </TabList>
            <TabPanels>
              {/* 颜色定制面板 */}
              <TabPanel>
                <Flex justifyContent="space-between" alignItems="center" mb={4}>
                  <Text fontWeight="bold">Customize Colors</Text>
                  <Button leftIcon={<IoMdAdd />} onClick={handleAddColor}>Add Color</Button>
                </Flex>
                <Flex flexWrap="wrap" gap={4}>
                  {colors.map(color => (
                    <Card key={color.id} minW="250px">
                      <CardBody>
                        <Flex flexDirection="column" gap={2}>
                          <Flex justifyContent="space-between" alignItems="center">
                            <Text fontWeight="bold">{color.name}</Text>
                            <Button 
                              size="sm" 
                              colorScheme="red" 
                              leftIcon={<IoMdTrash />}
                              onClick={() => handleDeleteColor(color.id)}
                            >
                              Delete
                            </Button>
                          </Flex>
                          <Input 
                            type="color" 
                            value={color.value}
                            onChange={(e) => handleColorChange(color.id, e.target.value)}
                            style={{ height: '40px', cursor: 'pointer' }}
                          />
                          <Input 
                            value={color.value}
                            onChange={(e) => handleColorChange(color.id, e.target.value)}
                            placeholder="Color value"
                          />
                        </Flex>
                      </CardBody>
                    </Card>
                  ))}
                </Flex>
              </TabPanel>
              
              {/* 字体定制面板 */}
              <TabPanel>
                <Text fontWeight="bold" mb={4}>Customize Fonts</Text>
                <Flex flexWrap="wrap" gap={4}>
                  {fonts.map(font => (
                    <Card key={font.id} minW="300px">
                      <CardBody>
                        <Flex flexDirection="column" gap={2}>
                          <Text fontWeight="bold">{font.name}</Text>
                          <Input 
                            value={font.value}
                            onChange={(e) => handleFontChange(font.id, e.target.value)}
                            placeholder="Font family"
                          />
                          <Text 
                            fontFamily={font.value}
                            fontSize="xl"
                          >
                            The quick brown fox jumps over the lazy dog.
                          </Text>
                        </Flex>
                      </CardBody>
                    </Card>
                  ))}
                </Flex>
              </TabPanel>
              
              {/* 圆角定制面板 */}
              <TabPanel>
                <Text fontWeight="bold" mb={4}>Customize Radii</Text>
                <Flex flexWrap="wrap" gap={4}>
                  {radii.map(radius => (
                    <Card key={radius.id} minW="250px">
                      <CardBody>
                        <Flex flexDirection="column" gap={2}>
                          <Text fontWeight="bold">{radius.name}</Text>
                          <Input 
                            value={radius.value}
                            onChange={(e) => handleRadiusChange(radius.id, e.target.value)}
                            placeholder="Radius value"
                          />
                          <Box 
                            width="100%" 
                            height="50px" 
                            bg="blue.500" 
                            borderRadius={radius.value}
                          />
                        </Flex>
                      </CardBody>
                    </Card>
                  ))}
                </Flex>
              </TabPanel>
              
              {/* 阴影定制面板 */}
              <TabPanel>
                <Text fontWeight="bold" mb={4}>Customize Shadows</Text>
                <Flex flexWrap="wrap" gap={4}>
                  {shadows.map(shadow => (
                    <Card key={shadow.id} minW="250px">
                      <CardBody>
                        <Flex flexDirection="column" gap={2}>
                          <Text fontWeight="bold">{shadow.name}</Text>
                          <Input 
                            value={shadow.value}
                            onChange={(e) => handleShadowChange(shadow.id, e.target.value)}
                            placeholder="Shadow value"
                          />
                          <Box 
                            width="100%" 
                            height="50px" 
                            bg="white" 
                            boxShadow={shadow.value}
                          />
                        </Flex>
                      </CardBody>
                    </Card>
                  ))}
                </Flex>
              </TabPanel>
              
              {/* 设置面板 */}
              <TabPanel>
                <Text fontWeight="bold" mb={4}>Settings</Text>
                <FormControl mb={4}>
                  <FormLabel>Transition Duration (ms)</FormLabel>
                  <Slider 
                    min={0} 
                    max={1000} 
                    step={50}
                    value={transitionDuration}
                    onChange={setTransitionDuration}
                  >
                    <SliderTrack>
                      <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb />
                  </Slider>
                  <FormHelperText>
                    Controls the smoothness of transitions when theme changes.
                  </FormHelperText>
                </FormControl>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </CardBody>
      </Card>
      
      {/* 主题预览 */}
      {showPreview && (
        <Card mt={8}>
          <CardHeader>
            <Flex justifyContent="space-between" alignItems="center">
              <Heading size="md">Theme Preview</Heading>
              <Text fontSize="sm" color="text.secondary">
                Live preview of your custom theme
              </Text>
            </Flex>
          </CardHeader>
          <CardBody>
            {previewComponent || <DefaultPreviewComponent />}
          </CardBody>
        </Card>
      )}
      
      {/* 导入主题模态框 */}
      <Modal isOpen={showImportModal} onClose={() => setShowImportModal(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Import Theme</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb={4}>
              <FormLabel>Import Theme File</FormLabel>
              <Input 
                type="file" 
                accept=".json,.css"
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    setImportFile(e.target.files[0]);
                  }
                }}
              />
              <FormHelperText>
                Import a theme file in JSON or CSS format.
              </FormHelperText>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => setShowImportModal(false)}>Cancel</Button>
            <Button 
              colorScheme="blue" 
              onClick={handleImportTheme}
              isDisabled={!importFile}
            >
              Import
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      
      {/* 导出主题模态框 */}
      <Modal isOpen={showExportModal} onClose={() => setShowExportModal(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Export Theme</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb={4}>
              <FormLabel>Export Format</FormLabel>
              <Select 
                value={exportFormat}
                onChange={(e) => setExportFormat(e.target.value as 'json' | 'css')}
              >
                <option value="json">JSON</option>
                <option value="css">CSS Variables</option>
              </Select>
              <FormHelperText>
                Choose whether to export as JSON or CSS variables.
              </FormHelperText>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => setShowExportModal(false)}>Cancel</Button>
            <Button colorScheme="blue" onClick={handleExportTheme}>
              Export
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      
      {/* 重置主题模态框 */}
      <Modal isOpen={showResetModal} onClose={() => setShowResetModal(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Reset Theme</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              Are you sure you want to reset the theme to default settings? This action cannot be undone.
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => setShowResetModal(false)}>Cancel</Button>
            <Button colorScheme="red" onClick={handleResetTheme}>
              Reset
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      
      {/* 添加平滑过渡样式 */}
      <style jsx>{`
        :global(*) {
          transition: all ${transitionDuration}ms ease;
        }
      `}</style>
    </Box>
  );
};

export default ThemeCustomizer;