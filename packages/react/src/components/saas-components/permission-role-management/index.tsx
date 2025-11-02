import { Box, Card, CardBody, CardHeader, Heading, Text, Flex, Button, Input, Select, Table, Thead, Tbody, Tr, Th, Td, Checkbox, FormControl, FormLabel, FormHelperText, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure, useColorModeValue, Avatar } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { IoMdAdd, IoMdTrash, IoMdSettings, IoMdPerson, IoMdLock, IoMdMenu, IoMdArrowForward } from 'react-icons/io';

// 定义角色类型
export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  createdAt: Date;
  updatedAt: Date;
}

// 定义权限类型
export interface Permission {
  id: string;
  name: string;
  description: string;
  category: string;
  isActive: boolean;
}

// 角色选择器props
export interface RoleSelectorProps {
  roles: Role[];
  selectedRole?: Role;
  onRoleChange: (role: Role | undefined) => void;
  onAddRole: () => void;
  onEditRole: (role: Role) => void;
  onDeleteRole: (role: Role) => void;
  placeholder?: string;
}

// 权限勾选表格props
export interface PermissionTableProps {
  permissions: Permission[];
  selectedPermissions: string[];
  onPermissionsChange: (permissions: string[]) => void;
  categories?: string[];
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
}

// 权限关系图props
export interface PermissionGraphProps {
  roles: Role[];
  permissions: Permission[];
  selectedRole?: Role;
  selectedPermission?: Permission;
  onRoleSelect?: (role: Role) => void;
  onPermissionSelect?: (permission: Permission) => void;
}

// 角色选择器组件
const RoleSelector = ({ 
  roles, 
  selectedRole, 
  onRoleChange, 
  onAddRole, 
  onEditRole, 
  onDeleteRole,
  placeholder = 'Select a role'
}: RoleSelectorProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRoles, setFilteredRoles] = useState(roles);

  // 过滤角色
  useEffect(() => {
    if (!searchQuery) {
      setFilteredRoles(roles);
      return;
    }
    setFilteredRoles(roles.filter(role => 
      role.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      role.description.toLowerCase().includes(searchQuery.toLowerCase())
    ));
  }, [searchQuery, roles]);

  return (
    <Box>
      <Flex justifyContent="space-between" alignItems="center" mb={4}>
        <FormControl w="full">
          <FormLabel>Select Role</FormLabel>
          <Select 
            placeholder={placeholder}
            value={selectedRole?.id || ''}
            onChange={(e) => {
              const role = roles.find(r => r.id === e.target.value);
              onRoleChange(role);
            }}
          >
            {roles.map(role => (
              <option key={role.id} value={role.id}>
                {role.name} - {role.description}
              </option>
            ))}
          </Select>
        </FormControl>
        <Button 
          leftIcon={<IoMdAdd />} 
          colorScheme="blue" 
          ml={4} 
          onClick={onAddRole}
        >
          Add Role
        </Button>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Manage Roles</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input 
              placeholder="Search roles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              mb={4}
            />
            <Box maxH="500px" overflowY="auto">
              {filteredRoles.map(role => (
                <Flex 
                  key={role.id}
                  justifyContent="space-between"
                  alignItems="center"
                  p={3}
                  borderBottom="1px solid" 
                  borderColor={useColorModeValue('gray.200', 'gray.700')}
                >
                  <Flex flexDirection="column">
                    <Text fontWeight="bold">{role.name}</Text>
                    <Text fontSize="sm" color="text.secondary">{role.description}</Text>
                    <Text fontSize="xs" color="text.secondary">
                      {role.permissions.length} permissions
                    </Text>
                  </Flex>
                  <Flex gap={2}>
                    <Button 
                      size="sm" 
                      colorScheme="blue" 
                      leftIcon={<IoMdSettings />}
                      onClick={() => {
                        onEditRole(role);
                        onClose();
                      }}
                    >
                      Edit
                    </Button>
                    <Button 
                      size="sm" 
                      colorScheme="red" 
                      leftIcon={<IoMdTrash />}
                      onClick={() => {
                        onDeleteRole(role);
                        onClose();
                      }}
                    >
                      Delete
                    </Button>
                  </Flex>
                </Flex>
              ))}
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

// 权限勾选表格组件
const PermissionTable = ({ 
  permissions, 
  selectedPermissions, 
  onPermissionsChange,
  categories = [],
  searchQuery = '',
  onSearchChange 
}: PermissionTableProps) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // 过滤权限
  const filteredPermissions = permissions.filter(permission => {
    const matchesCategory = selectedCategory === 'all' || permission.category === selectedCategory;
    const matchesSearch = !searchQuery || 
      permission.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      permission.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // 按分类分组权限
  const groupedPermissions = filteredPermissions.reduce((groups, permission) => {
    const { category } = permission;
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(permission);
    return groups;
  }, {} as Record<string, Permission[]>);

  // 处理权限选择变化
  const handlePermissionChange = (permissionId: string, isChecked: boolean) => {
    if (isChecked) {
      onPermissionsChange([...selectedPermissions, permissionId]);
    } else {
      onPermissionsChange(selectedPermissions.filter(id => id !== permissionId));
    }
  };

  // 处理全选
  const handleSelectAll = (category: string, isChecked: boolean) => {
    const categoryPermissions = groupedPermissions[category].map(p => p.id);
    if (isChecked) {
      onPermissionsChange([...new Set([...selectedPermissions, ...categoryPermissions])]);
    } else {
      onPermissionsChange(selectedPermissions.filter(id => !categoryPermissions.includes(id)));
    }
  };

  return (
    <Box>
      <Flex justifyContent="space-between" alignItems="center" mb={4} gap={4} flexWrap="wrap">
        <FormControl flex={1} minW="200px">
          <FormLabel>Search Permissions</FormLabel>
          <Input 
            placeholder="Search by name or description..."
            value={searchQuery}
            onChange={(e) => onSearchChange?.(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
          />
        </FormControl>
        <FormControl minW="150px">
          <FormLabel>Filter by Category</FormLabel>
          <Select 
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </Select>
        </FormControl>
      </Flex>

      <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th width="50px">
                <Checkbox 
                  isChecked={selectedPermissions.length === filteredPermissions.length && filteredPermissions.length > 0}
                  onChange={(e) => {
                    if (e.target.checked) {
                      onPermissionsChange(filteredPermissions.map(p => p.id));
                    } else {
                      onPermissionsChange([]);
                    }
                  }}
                />
              </Th>
              <Th>Permission Name</Th>
              <Th>Description</Th>
              <Th>Category</Th>
              <Th>Status</Th>
            </Tr>
          </Thead>
          <Tbody>
            {Object.entries(groupedPermissions).map(([category, categoryPermissions]) => (
              <>
                <Tr bg={useColorModeValue('gray.50', 'gray.800')}>
                  <Td colSpan={5}>
                    <Flex justifyContent="space-between" alignItems="center">
                      <Text fontWeight="bold" pl={2}>{category}</Text>
                      <Checkbox 
                        isChecked={categoryPermissions.every(p => selectedPermissions.includes(p.id))}
                        onChange={(e) => handleSelectAll(category, e.target.checked)}
                      />
                    </Flex>
                  </Td>
                </Tr>
                {categoryPermissions.map(permission => (
                  <Tr key={permission.id}>
                    <Td>
                      <Checkbox 
                        isChecked={selectedPermissions.includes(permission.id)}
                        onChange={(e) => handlePermissionChange(permission.id, e.target.checked)}
                      />
                    </Td>
                    <Td>{permission.name}</Td>
                    <Td>{permission.description}</Td>
                    <Td>{permission.category}</Td>
                    <Td>
                      <Box 
                        w="10px" 
                        h="10px" 
                        borderRadius="full" 
                        bg={permission.isActive ? 'green.500' : 'red.500'} 
                        display="inline-block" 
                        mr={2}
                      />
                      {permission.isActive ? 'Active' : 'Inactive'}
                    </Td>
                  </Tr>
                ))}
              </>
            ))}
            {Object.keys(groupedPermissions).length === 0 && (
              <Tr>
                <Td colSpan={5} textAlign="center" py={8}>
                  No permissions found
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};

// 权限关系图组件（基于React DnD实现拖拽）
const PermissionGraph = ({ 
  roles, 
  permissions, 
  selectedRole, 
  selectedPermission,
  onRoleSelect,
  onPermissionSelect
}: PermissionGraphProps) => {
  // 定义拖拽类型
  const ItemTypes = {
    ROLE: 'role',
    PERMISSION: 'permission'
  };

  // 拖拽项组件
  const DragItem = ({ type, item, children }: any) => {
    const [{ isDragging }, drag] = useDrag({
      type: type,
      item: item,
      collect: (monitor) => ({
        isDragging: monitor.isDragging()
      })
    });

    return (
      <div
        ref={drag}
        style={{
          opacity: isDragging ? 0.5 : 1,
          cursor: 'move',
          transition: 'opacity 0.3s ease'
        }}
      >
        {children}
      </div>
    );
  };

  // 放置目标组件
  const DropTarget = ({ type, onDrop, children }: any) => {
    const [{ isOver }, drop] = useDrop({
      accept: type,
      drop: (item) => onDrop(item),
      collect: (monitor) => ({
        isOver: monitor.isOver()
      })
    });

    return (
      <div
        ref={drop}
        style={{
          backgroundColor: isOver ? '#e2e8f0' : 'transparent',
          borderRadius: 'md',
          padding: '4px',
          transition: 'background-color 0.3s ease'
        }}
      >
        {children}
      </div>
    );
  };

  // 处理角色拖拽到权限
  const handleRoleDropOnPermission = (role: Role, permission: Permission) => {
    // 这里可以实现角色和权限的关联逻辑
    console.log(`Adding permission ${permission.name} to role ${role.name}`);
  };

  // 处理权限拖拽到角色
  const handlePermissionDropOnRole = (permission: Permission, role: Role) => {
    // 这里可以实现权限和角色的关联逻辑
    console.log(`Adding role ${role.name} to permission ${permission.name}`);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Box borderWidth="1px" borderRadius="lg" p={6} overflowX="auto">
        <Heading size="md" mb={6}>Permission Relationship Graph</Heading>
        
        <Flex gap={8} minW="1200px">
          {/* 角色列 */}
          <Box flex={1}>
            <Heading size="sm" mb={3} textAlign="center">Roles</Heading>
            <DropTarget 
              type={ItemTypes.PERMISSION} 
              onDrop={(permission) => {
                if (selectedRole) {
                  handlePermissionDropOnRole(permission, selectedRole);
                }
              }}
            >
              <Box 
                borderWidth="1px" 
                borderRadius="lg" 
                p={4} 
                minH="400px"
                bg={useColorModeValue('gray.50', 'gray.800')}
              >
                {roles.map(role => (
                  <DragItem 
                    key={role.id} 
                    type={ItemTypes.ROLE} 
                    item={role}
                  >
                    <Box 
                      p={3} 
                      mb={3} 
                      borderRadius="md" 
                      bg={selectedRole?.id === role.id ? 'blue.100' : 'white'} 
                      borderWidth="1px"
                      cursor="pointer"
                      onClick={() => onRoleSelect?.(role)}
                      transition="all 0.3s ease"
                      _hover={{ bg: selectedRole?.id === role.id ? 'blue.200' : 'gray.100' }}
                    >
                      <Flex alignItems="center">
                        <Avatar size="sm" name={role.name} mr={2} />
                        <Text fontWeight="medium">{role.name}</Text>
                      </Flex>
                      <Text fontSize="xs" color="text.secondary">
                        {role.permissions.length} permissions
                      </Text>
                    </Box>
                  </DragItem>
                ))}
              </Box>
            </DropTarget>
          </Box>

          {/* 箭头 */}
          <Box flexShrink="0" display="flex" alignItems="center" justifyContent="center" h="full">
            <IoMdArrowForward size={24} color="gray.500" />
          </Box>

          {/* 权限列 */}
          <Box flex={2}>
            <Heading size="sm" mb={3} textAlign="center">Permissions</Heading>
            <DropTarget 
              type={ItemTypes.ROLE} 
              onDrop={(role) => {
                if (selectedPermission) {
                  handleRoleDropOnPermission(role, selectedPermission);
                }
              }}
            >
              <Box 
                borderWidth="1px" 
                borderRadius="lg" 
                p={4} 
                minH="400px"
                bg={useColorModeValue('gray.50', 'gray.800')}
              >
                <Flex flexWrap="wrap" gap={3}>
                  {permissions.map(permission => (
                    <DragItem 
                      key={permission.id} 
                      type={ItemTypes.PERMISSION} 
                      item={permission}
                    >
                      <Box 
                        p={2} 
                        borderRadius="md" 
                        bg={selectedPermission?.id === permission.id ? 'green.100' : 'white'} 
                        borderWidth="1px"
                        cursor="pointer"
                        onClick={() => onPermissionSelect?.(permission)}
                        transition="all 0.3s ease"
                        _hover={{ bg: selectedPermission?.id === permission.id ? 'green.200' : 'gray.100' }}
                      >
                        <Text fontSize="sm" fontWeight="medium">{permission.name}</Text>
                        <Text fontSize="xs" color="text.secondary">{permission.category}</Text>
                      </Box>
                    </DragItem>
                  ))}
                </Flex>
              </Box>
            </DropTarget>
          </Box>
        </Flex>
      </Box>
    </DndProvider>
  );
};

// 权限角色管理主组件
export const PermissionRoleManagement = () => {
  // 模拟数据
  const [roles, setRoles] = useState<Role[]>([
    {
      id: 'role-1',
      name: 'Admin',
      description: 'Full system access',
      permissions: ['perm-1', 'perm-2', 'perm-3', 'perm-4', 'perm-5'],
      createdAt: new Date('2023-01-01'),
      updatedAt: new Date('2023-01-01')
    },
    {
      id: 'role-2',
      name: 'Editor',
      description: 'Content editing access',
      permissions: ['perm-1', 'perm-2', 'perm-3'],
      createdAt: new Date('2023-01-02'),
      updatedAt: new Date('2023-01-02')
    },
    {
      id: 'role-3',
      name: 'Viewer',
      description: 'Read-only access',
      permissions: ['perm-1'],
      createdAt: new Date('2023-01-03'),
      updatedAt: new Date('2023-01-03')
    }
  ]);

  const [permissions, setPermissions] = useState<Permission[]>([
    {
      id: 'perm-1',
      name: 'view_dashboard',
      description: 'View dashboard statistics',
      category: 'Dashboard',
      isActive: true
    },
    {
      id: 'perm-2',
      name: 'edit_content',
      description: 'Edit website content',
      category: 'Content',
      isActive: true
    },
    {
      id: 'perm-3',
      name: 'manage_users',
      description: 'Manage user accounts',
      category: 'Users',
      isActive: true
    },
    {
      id: 'perm-4',
      name: 'manage_roles',
      description: 'Manage roles and permissions',
      category: 'Permissions',
      isActive: true
    },
    {
      id: 'perm-5',
      name: 'view_logs',
      description: 'View system logs',
      category: 'Logs',
      isActive: true
    },
    {
      id: 'perm-6',
      name: 'manage_settings',
      description: 'Manage system settings',
      category: 'Settings',
      isActive: true
    }
  ]);

  const [selectedRole, setSelectedRole] = useState<Role | undefined>(roles[0]);
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>(selectedRole?.permissions || []);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddRoleModal, setShowAddRoleModal] = useState(false);
  const [newRoleName, setNewRoleName] = useState('');
  const [newRoleDescription, setNewRoleDescription] = useState('');

  // 处理角色选择变化
  const handleRoleChange = (role: Role | undefined) => {
    setSelectedRole(role);
    if (role) {
      setSelectedPermissions(role.permissions);
    } else {
      setSelectedPermissions([]);
    }
  };

  // 处理权限变化
  const handlePermissionsChange = (permissions: string[]) => {
    setSelectedPermissions(permissions);
    // 更新角色的权限
    if (selectedRole) {
      const updatedRole = { ...selectedRole, permissions };
      setRoles(roles.map(r => r.id === selectedRole.id ? updatedRole : r));
    }
  };

  // 处理添加角色
  const handleAddRole = () => {
    setShowAddRoleModal(true);
  };

  // 确认添加角色
  const confirmAddRole = () => {
    if (!newRoleName.trim()) return;
    
    const newRole: Role = {
      id: `role-${Date.now()}`,
      name: newRoleName.trim(),
      description: newRoleDescription.trim(),
      permissions: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    setRoles([...roles, newRole]);
    setShowAddRoleModal(false);
    setNewRoleName('');
    setNewRoleDescription('');
  };

  // 处理编辑角色
  const handleEditRole = (role: Role) => {
    // 这里可以实现编辑角色的逻辑
    console.log('Edit role:', role);
  };

  // 处理删除角色
  const handleDeleteRole = (role: Role) => {
    if (window.confirm(`Are you sure you want to delete role "${role.name}"?`)) {
      setRoles(roles.filter(r => r.id !== role.id));
      if (selectedRole?.id === role.id) {
        setSelectedRole(roles.length > 1 ? roles.find(r => r.id !== role.id) : undefined);
      }
    }
  };

  // 获取所有权限类别
  const categories = [...new Set(permissions.map(p => p.category))];

  return (
    <Box>
      <Card>
        <CardHeader>
          <Heading size="lg">Permission & Role Management</Heading>
          <Text color="text.secondary">
            Manage user roles and their permissions
          </Text>
        </CardHeader>
        <CardBody>
          <Flex gap={8} flexDirection={{ base: 'column', lg: 'row' }}>
            {/* 左侧角色选择 */}
            <Box flex={1}>
              <RoleSelector 
                roles={roles}
                selectedRole={selectedRole}
                onRoleChange={handleRoleChange}
                onAddRole={handleAddRole}
                onEditRole={handleEditRole}
                onDeleteRole={handleDeleteRole}
              />
            </Box>

            {/* 右侧权限表格 */}
            <Box flex={2}>
              <PermissionTable 
                permissions={permissions}
                selectedPermissions={selectedPermissions}
                onPermissionsChange={handlePermissionsChange}
                categories={categories}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
              />
            </Box>
          </Flex>

          {/* 权限关系图 */}
          <Box mt={10}>
            <PermissionGraph 
              roles={roles}
              permissions={permissions}
              selectedRole={selectedRole}
              onRoleSelect={setSelectedRole}
            />
          </Box>
        </CardBody>
      </Card>

      {/* 添加角色模态框 */}
      <Modal isOpen={showAddRoleModal} onClose={() => setShowAddRoleModal(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Role</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isRequired mb={4}>
              <FormLabel>Role Name</FormLabel>
              <Input 
                placeholder="Enter role name"
                value={newRoleName}
                onChange={(e) => setNewRoleName(e.target.value)}
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Description</FormLabel>
              <Input 
                placeholder="Enter role description"
                value={newRoleDescription}
                onChange={(e) => setNewRoleDescription(e.target.value)}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => setShowAddRoleModal(false)}>Cancel</Button>
            <Button colorScheme="blue" onClick={confirmAddRole}>
              Add Role
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

// 导出组件
export { RoleSelector, PermissionTable, PermissionGraph };
export default PermissionRoleManagement;