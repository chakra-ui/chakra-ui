import { Box, Card, CardBody, CardHeader, Heading, Text, Flex, Button, Input, Select, Table, Thead, Tbody, Tr, Th, Td, Badge, Tag, TagLabel, TagCloseButton, useColorModeValue, Avatar, Menu, MenuButton, MenuList, MenuItem, MenuDivider, Switch, FormControl, FormLabel, FormHelperText, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure, Popover, PopoverTrigger, PopoverContent, PopoverHeader, PopoverBody, PopoverFooter, PopoverArrow, PopoverCloseButton } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { IoMdAdd, IoMdTrash, IoMdEdit, IoMdSettings, IoMdFilter, IoMdSearch, IoMdArrowForward, IoMdArrowBack, IoMdCheckmarkCircle, IoMdAlertCircle, IoMdHelpCircle, IoMdTime, IoMdPerson, IoMdCalendar, IoMdMenu } from 'react-icons/io';

// 定义工单类型
export interface Ticket {
  id: string;
  title: string;
  description: string;
  status: 'open' | 'in-progress' | 'resolved' | 'closed' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'critical';
  assignee?: string;
  reporter: string;
  createdAt: Date;
  updatedAt: Date;
  dueDate?: Date;
  tags: string[];
}

// 定义用户类型
export interface User {
  id: string;
  name: string;
  avatar?: string;
  email: string;
  role: string;
}

// 工单列表props
export interface TicketListProps {
  tickets: Ticket[];
  users: User[];
  onTicketSelect: (ticket: Ticket) => void;
  onAddTicket: () => void;
  onEditTicket: (ticket: Ticket) => void;
  onDeleteTicket: (ticket: Ticket) => void;
  onUpdateStatus: (ticketId: string, status: Ticket['status']) => void;
  onUpdatePriority: (ticketId: string, priority: Ticket['priority']) => void;
  onUpdateAssignee: (ticketId: string, assigneeId?: string) => void;
  selectedTicket?: Ticket;
}

// 状态流转控件props
export interface StatusFlowProps {
  currentStatus: Ticket['status'];
  onStatusChange: (status: Ticket['status']) => void;
  allowedStatuses?: Ticket['status'][];
}

// 优先级标签props
export interface PriorityTagProps {
  priority: Ticket['priority'];
  onPriorityChange?: (priority: Ticket['priority']) => void;
  size?: 'sm' | 'md' | 'lg';
}

// 工单详情props
export interface TicketDetailProps {
  ticket: Ticket;
  users: User[];
  onUpdateStatus: (status: Ticket['status']) => void;
  onUpdatePriority: (priority: Ticket['priority']) => void;
  onUpdateAssignee: (assigneeId?: string) => void;
  onAddTag: (tag: string) => void;
  onRemoveTag: (tag: string) => void;
  onClose: () => void;
}

// 优先级标签组件
const PriorityTag = ({ priority, onPriorityChange, size = 'md' }: PriorityTagProps) => {
  const priorityColors = {
    low: 'green',
    medium: 'yellow',
    high: 'orange',
    critical: 'red'
  };

  const priorityLabels = {
    low: 'Low',
    medium: 'Medium',
    high: 'High',
    critical: 'Critical'
  };

  const priorityIcons = {
    low: <IoMdCheckmarkCircle />,
    medium: <IoMdHelpCircle />,
    high: <IoMdAlertCircle />,
    critical: <IoMdAlertCircle />
  };

  const getSize = () => {
    switch (size) {
      case 'sm':
        return { fontSize: 'xs', px: 2, py: 1 };
      case 'lg':
        return { fontSize: 'md', px: 3, py: 1.5 };
      default:
        return { fontSize: 'sm', px: 2, py: 1 };
    }
  };

  if (onPriorityChange) {
    return (
      <Popover trigger="click">
        <PopoverTrigger>
          <Badge 
            colorScheme={priorityColors[priority]}
            variant="solid"
            borderRadius="full"
            px={2}
            py={1}
            cursor="pointer"
            display="inline-flex"
            alignItems="center"
            gap={1}
            {...getSize()}
          >
            {priorityIcons[priority]}
            {priorityLabels[priority]}
          </Badge>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverHeader>Change Priority</PopoverHeader>
          <PopoverBody>
            <Flex flexDirection="column" gap={2}>
              {Object.entries(priorityLabels).map(([key, label]) => (
                <Button 
                  key={key}
                  leftIcon={priorityIcons[key as Ticket['priority']]}
                  colorScheme={priorityColors[key as Ticket['priority']]}
                  onClick={() => onPriorityChange(key as Ticket['priority'])}
                  variant="ghost"
                  justifyContent="flex-start"
                >
                  {label}
                </Button>
              ))}
            </Flex>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Badge 
      colorScheme={priorityColors[priority]}
      variant="solid"
      borderRadius="full"
      px={2}
      py={1}
      display="inline-flex"
      alignItems="center"
      gap={1}
      {...getSize()}
    >
      {priorityIcons[priority]}
      {priorityLabels[priority]}
    </Badge>
  );
};

// 状态流转控件组件
const StatusFlow = ({ currentStatus, onStatusChange, allowedStatuses }: StatusFlowProps) => {
  const statuses: Array<{ value: Ticket['status'], label: string, color: string }> = [
    { value: 'open', label: 'Open', color: 'blue' },
    { value: 'in-progress', label: 'In Progress', color: 'purple' },
    { value: 'resolved', label: 'Resolved', color: 'green' },
    { value: 'closed', label: 'Closed', color: 'gray' },
    { value: 'cancelled', label: 'Cancelled', color: 'red' },
  ];

  // 过滤允许的状态
  const filteredStatuses = allowedStatuses 
    ? statuses.filter(s => allowedStatuses.includes(s.value))
    : statuses;

  // 获取当前状态的索引
  const currentIndex = filteredStatuses.findIndex(s => s.value === currentStatus);

  return (
    <Box>
      <Flex alignItems="center" justifyContent="space-between" mb={2}>
        <Text fontWeight="medium">Status</Text>
        <Text fontSize="sm" color="text.secondary">
          Current: {filteredStatuses[currentIndex]?.label}
        </Text>
      </Flex>
      
      <Flex alignItems="center" gap={4} flexWrap="wrap">
        {filteredStatuses.map((status, index) => (
          <Box key={status.value} display="flex" alignItems="center" gap={2}>
            <Button 
              size="sm"
              colorScheme={status.color}
              isDisabled={index < currentIndex}
              onClick={() => onStatusChange(status.value)}
              variant={currentStatus === status.value ? 'solid' : 'outline'}
            >
              {status.label}
            </Button>
            {index < filteredStatuses.length - 1 && (
              <IoMdArrowForward size={16} color="gray.400" />
            )}
          </Box>
        ))}
      </Flex>
    </Box>
  );
};

// 工单列表组件
const TicketList = ({ 
  tickets, 
  users, 
  onTicketSelect, 
  onAddTicket, 
  onEditTicket, 
  onDeleteTicket, 
  onUpdateStatus, 
  onUpdatePriority, 
  onUpdateAssignee,
  selectedTicket
}: TicketListProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [filterAssignee, setFilterAssignee] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [ticketsPerPage] = useState(10);
  const [showFilters, setShowFilters] = useState(false);

  // 过滤工单
  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = !searchQuery || 
      ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || ticket.status === filterStatus;
    
    const matchesPriority = filterPriority === 'all' || ticket.priority === filterPriority;
    
    const matchesAssignee = filterAssignee === 'all' || ticket.assignee === filterAssignee;
    
    return matchesSearch && matchesStatus && matchesPriority && matchesAssignee;
  });

  // 分页
  const indexOfLastTicket = currentPage * ticketsPerPage;
  const indexOfFirstTicket = indexOfLastTicket - ticketsPerPage;
  const currentTickets = filteredTickets.slice(indexOfFirstTicket, indexOfLastTicket);
  const totalPages = Math.ceil(filteredTickets.length / ticketsPerPage);

  // 获取用户名
  const getUserName = (userId?: string) => {
    if (!userId) return 'Unassigned';
    const user = users.find(u => u.id === userId);
    return user ? user.name : 'Unknown User';
  };

  // 获取用户头像
  const getUserAvatar = (userId?: string) => {
    if (!userId) return undefined;
    const user = users.find(u => u.id === userId);
    return user ? user.avatar : undefined;
  };

  return (
    <Box>
      <Flex justifyContent="space-between" alignItems="center" mb={4} flexWrap="wrap" gap={4}>
        <Heading size="md">Tickets</Heading>
        <Button 
          leftIcon={<IoMdAdd />} 
          colorScheme="blue" 
          onClick={onAddTicket}
        >
          Create Ticket
        </Button>
      </Flex>

      {/* 搜索和筛选 */}
      <Card mb={6}>
        <CardBody>
          <Flex gap={4} flexWrap="wrap" alignItems="start">
            <FormControl flex={1} minW="200px">
              <FormLabel>Search Tickets</FormLabel>
              <Input 
                placeholder="Search by title or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                leftIcon={<IoMdSearch />}
              />
            </FormControl>

            <Button 
              leftIcon={<IoMdFilter />}
              onClick={() => setShowFilters(!showFilters)}
              variant="outline"
              alignSelf="flex-end"
            >
              Filters
            </Button>
          </Flex>

          {showFilters && (
            <Box mt={6} display="flex" gap={4} flexWrap="wrap">
              <FormControl minW="150px">
                <FormLabel>Status</FormLabel>
                <Select 
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="all">All Statuses</option>
                  <option value="open">Open</option>
                  <option value="in-progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                  <option value="closed">Closed</option>
                  <option value="cancelled">Cancelled</option>
                </Select>
              </FormControl>

              <FormControl minW="150px">
                <FormLabel>Priority</FormLabel>
                <Select 
                  value={filterPriority}
                  onChange={(e) => setFilterPriority(e.target.value)}
                >
                  <option value="all">All Priorities</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="critical">Critical</option>
                </Select>
              </FormControl>

              <FormControl minW="150px">
                <FormLabel>Assignee</FormLabel>
                <Select 
                  value={filterAssignee}
                  onChange={(e) => setFilterAssignee(e.target.value)}
                >
                  <option value="all">All Assignees</option>
                  <option value="">Unassigned</option>
                  {users.map(user => (
                    <option key={user.id} value={user.id}>
                      {user.name}
                    </option>
                  ))}
                </Select>
              </FormControl>

              <Flex gap={2} alignSelf="flex-end">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setFilterStatus('all');
                    setFilterPriority('all');
                    setFilterAssignee('all');
                  }}
                >
                  Reset
                </Button>
                <Button 
                  colorScheme="blue" 
                  onClick={() => setShowFilters(false)}
                >
                  Apply
                </Button>
              </Flex>
            </Box>
          )}
        </CardBody>
      </Card>

      {/* 工单表格 */}
      <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th width="80px">ID</Th>
              <Th>Title</Th>
              <Th>Status</Th>
              <Th>Priority</Th>
              <Th>Assignee</Th>
              <Th>Reporter</Th>
              <Th>Created At</Th>
              <Th width="120px">Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {currentTickets.map(ticket => (
              <Tr 
                key={ticket.id}
                bg={selectedTicket?.id === ticket.id ? useColorModeValue('blue.50', 'blue.900') : 'transparent'}
                cursor="pointer"
                onClick={() => onTicketSelect(ticket)}
                transition="background-color 0.2s ease"
              >
                <Td>{ticket.id}</Td>
                <Td>{ticket.title}</Td>
                <Td>
                  <Badge 
                    colorScheme={
                      ticket.status === 'open' ? 'blue' :
                      ticket.status === 'in-progress' ? 'purple' :
                      ticket.status === 'resolved' ? 'green' :
                      ticket.status === 'closed' ? 'gray' : 'red'
                    }
                    variant="subtle"
                  >
                    {ticket.status === 'open' ? 'Open' :
                     ticket.status === 'in-progress' ? 'In Progress' :
                     ticket.status === 'resolved' ? 'Resolved' :
                     ticket.status === 'closed' ? 'Closed' : 'Cancelled'}
                  </Badge>
                </Td>
                <Td>
                  <PriorityTag priority={ticket.priority} />
                </Td>
                <Td>
                  <Flex alignItems="center">
                    <Avatar 
                      size="xs" 
                      name={getUserName(ticket.assignee)} 
                      src={getUserAvatar(ticket.assignee)}
                      mr={2}
                    />
                    <Text fontSize="sm">{getUserName(ticket.assignee)}</Text>
                  </Flex>
                </Td>
                <Td>
                  <Flex alignItems="center">
                    <Avatar 
                      size="xs" 
                      name={getUserName(ticket.reporter)} 
                      src={getUserAvatar(ticket.reporter)}
                      mr={2}
                    />
                    <Text fontSize="sm">{getUserName(ticket.reporter)}</Text>
                  </Flex>
                </Td>
                <Td>{ticket.createdAt.toLocaleString()}</Td>
                <Td>
                  <Flex gap={2}>
                    <Button 
                      size="sm" 
                      colorScheme="blue" 
                      leftIcon={<IoMdEdit />}
                      onClick={(e) => {
                        e.stopPropagation();
                        onEditTicket(ticket);
                      }}
                    >
                      Edit
                    </Button>
                    <Button 
                      size="sm" 
                      colorScheme="red" 
                      leftIcon={<IoMdTrash />}
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteTicket(ticket);
                      }}
                    >
                      Delete
                    </Button>
                  </Flex>
                </Td>
              </Tr>
            ))}
            {currentTickets.length === 0 && (
              <Tr>
                <Td colSpan={8} textAlign="center" py={8}>
                  No tickets found
                </Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </Box>

      {/* 分页 */}
      {totalPages > 1 && (
        <Flex justifyContent="space-between" alignItems="center" mt={6}>
          <Text fontSize="sm" color="text.secondary">
            Showing {indexOfFirstTicket + 1} to {Math.min(indexOfLastTicket, filteredTickets.length)} of {filteredTickets.length} tickets
          </Text>
          <Flex gap={2}>
            <Button 
              size="sm" 
              variant="outline"
              leftIcon={<IoMdArrowBack />}
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              isDisabled={currentPage === 1}
            >
              Previous
            </Button>
            <Button 
              size="sm" 
              variant="outline"
              rightIcon={<IoMdArrowForward />}
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              isDisabled={currentPage === totalPages}
            >
              Next
            </Button>
          </Flex>
        </Flex>
      )}
    </Box>
  );
};

// 工单详情组件
const TicketDetail = ({ 
  ticket, 
  users, 
  onUpdateStatus, 
  onUpdatePriority, 
  onUpdateAssignee, 
  onAddTag, 
  onRemoveTag, 
  onClose 
}: TicketDetailProps) => {
  const [newTag, setNewTag] = useState('');
  const [showAssigneeMenu, setShowAssigneeMenu] = useState(false);

  // 获取用户名
  const getUserName = (userId?: string) => {
    if (!userId) return 'Unassigned';
    const user = users.find(u => u.id === userId);
    return user ? user.name : 'Unknown User';
  };

  // 获取用户头像
  const getUserAvatar = (userId?: string) => {
    if (!userId) return undefined;
    const user = users.find(u => u.id === userId);
    return user ? user.avatar : undefined;
  };

  // 处理添加标签
  const handleAddTag = () => {
    if (!newTag.trim() || ticket.tags.includes(newTag.trim())) return;
    onAddTag(newTag.trim());
    setNewTag('');
  };

  return (
    <Box>
      <Card>
        <CardHeader>
          <Flex justifyContent="space-between" alignItems="flex-start">
            <Flex flexDirection="column">
              <Heading size="lg">{ticket.title}</Heading>
              <Text color="text.secondary" mt={1}>{ticket.id}</Text>
            </Flex>
            <Button 
              size="sm" 
              variant="outline" 
              onClick={onClose}
            >
              Close
            </Button>
          </Flex>
        </CardHeader>
        <CardBody>
          <Flex gap={8} flexDirection={{ base: 'column', lg: 'row' }}>
            {/* 左侧详情 */}
            <Box flex={3}>
              <Box mb={6}>
                <Text fontWeight="bold" mb={2}>Description</Text>
                <Box 
                  p={4} 
                  bg={useColorModeValue('gray.50', 'gray.800')} 
                  borderRadius="md"
                  whiteSpace="pre-wrap"
                >
                  {ticket.description}
                </Box>
              </Box>

              <Box mb={6}>
                <Text fontWeight="bold" mb={2}>Tags</Text>
                <Flex flexWrap="wrap" gap={2} mb={3}>
                  {ticket.tags.map(tag => (
                    <Tag key={tag} size="md" variant="solid" colorScheme="blue">
                      <TagLabel>{tag}</TagLabel>
                      <TagCloseButton onClick={() => onRemoveTag(tag)} />
                    </Tag>
                  ))}
                </Flex>
                <Flex gap={2}>
                  <Input 
                    placeholder="Add new tag"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    size="sm"
                  />
                  <Button 
                    size="sm" 
                    colorScheme="blue" 
                    onClick={handleAddTag}
                  >
                    Add
                  </Button>
                </Flex>
              </Box>
            </Box>

            {/* 右侧元数据 */}
            <Box flex={1}>
              <Box mb={6}>
                <StatusFlow 
                  currentStatus={ticket.status}
                  onStatusChange={onUpdateStatus}
                />
              </Box>

              <Box mb={6}>
                <Text fontWeight="bold" mb={2}>Priority</Text>
                <PriorityTag 
                  priority={ticket.priority}
                  onPriorityChange={onUpdatePriority}
                  size="lg"
                />
              </Box>

              <Box mb={6}>
                <Text fontWeight="bold" mb={2}>Assignee</Text>
                <Menu isOpen={showAssigneeMenu} onClose={() => setShowAssigneeMenu(false)}> 
                  <MenuButton 
                    as={Button}
                    leftIcon={<Avatar 
                      size="sm" 
                      name={getUserName(ticket.assignee)} 
                      src={getUserAvatar(ticket.assignee)}
                    />}
                    rightIcon={<IoMdArrowForward />}
                    width="full"
                    justifyContent="flex-start"
                    variant="outline"
                    onClick={() => setShowAssigneeMenu(!showAssigneeMenu)}
                  >
                    {getUserName(ticket.assignee)}
                  </MenuButton>
                  <MenuList maxHeight="250px" overflowY="auto">
                    <MenuItem onClick={() => {
                      onUpdateAssignee(undefined);
                      setShowAssigneeMenu(false);
                    }}>
                      Unassigned
                    </MenuItem>
                    <MenuDivider />
                    {users.map(user => (
                      <MenuItem 
                        key={user.id}
                        onClick={() => {
                          onUpdateAssignee(user.id);
                          setShowAssigneeMenu(false);
                        }}
                      >
                        <Flex alignItems="center">
                          <Avatar 
                            size="xs" 
                            name={user.name} 
                            src={user.avatar}
                            mr={2}
                          />
                          {user.name}
                        </Flex>
                      </MenuItem>
                    ))}
                  </MenuList>
                </Menu>
              </Box>

              <Box mb={6}>
                <Text fontWeight="bold" mb={2}>Reporter</Text>
                <Flex alignItems="center">
                  <Avatar 
                    size="sm" 
                    name={getUserName(ticket.reporter)} 
                    src={getUserAvatar(ticket.reporter)}
                    mr={2}
                  />
                  <Text>{getUserName(ticket.reporter)}</Text>
                </Flex>
              </Box>

              <Box mb={6}>
                <Text fontWeight="bold" mb={2}>Created At</Text>
                <Text>{ticket.createdAt.toLocaleString()}</Text>
              </Box>

              {ticket.dueDate && (
                <Box mb={6}>
                  <Text fontWeight="bold" mb={2}>Due Date</Text>
                  <Text color={new Date(ticket.dueDate) < new Date() ? 'red.500' : 'inherit'}>
                    {ticket.dueDate.toLocaleString()}
                  </Text>
                </Box>
              )}
            </Box>
          </Flex>
        </CardBody>
      </Card>
    </Box>
  );
};

// 工单处理模块主组件
export const TicketManagement = () => {
  // 模拟数据
  const [tickets, setTickets] = useState<Ticket[]>([
    {
      id: 'ticket-1',
      title: 'Cannot access dashboard',
      description: 'I am unable to access the dashboard after logging in. The page just loads indefinitely.',
      status: 'open',
      priority: 'high',
      assignee: 'user-1',
      reporter: 'user-2',
      createdAt: new Date('2023-05-10 10:30:00'),
      updatedAt: new Date('2023-05-10 10:30:00'),
      dueDate: new Date('2023-05-15'),
      tags: ['dashboard', 'access', 'bug']
    },
    {
      id: 'ticket-2',
      title: 'Update profile picture not working',
      description: 'When I try to update my profile picture, the upload fails with an error message.',
      status: 'in-progress',
      priority: 'medium',
      assignee: 'user-3',
      reporter: 'user-4',
      createdAt: new Date('2023-05-09 14:45:00'),
      updatedAt: new Date('2023-05-10 09:15:00'),
      tags: ['profile', 'upload', 'bug']
    },
    {
      id: 'ticket-3',
      title: 'Request for new feature',
      description: 'I would like to request a new feature that allows bulk exporting of data.',
      status: 'resolved',
      priority: 'low',
      assignee: 'user-1',
      reporter: 'user-5',
      createdAt: new Date('2023-05-08 09:15:00'),
      updatedAt: new Date('2023-05-09 16:30:00'),
      tags: ['feature', 'export', 'request']
    },
    {
      id: 'ticket-4',
      title: 'Payment failed',
      description: 'My payment failed when trying to upgrade my subscription.',
      status: 'closed',
      priority: 'critical',
      assignee: 'user-2',
      reporter: 'user-6',
      createdAt: new Date('2023-05-07 16:20:00'),
      updatedAt: new Date('2023-05-07 17:45:00'),
      dueDate: new Date('2023-05-08'),
      tags: ['payment', 'subscription', 'urgent']
    },
    {
      id: 'ticket-5',
      title: 'Change password not sending email',
      description: 'When I try to reset my password, I don\'t receive the confirmation email.',
      status: 'open',
      priority: 'medium',
      assignee: undefined,
      reporter: 'user-7',
      createdAt: new Date('2023-05-10 11:15:00'),
      updatedAt: new Date('2023-05-10 11:15:00'),
      tags: ['password', 'email', 'bug']
    }
  ]);

  const [users, setUsers] = useState<User[]>([
    {
      id: 'user-1',
      name: 'John Doe',
      avatar: 'https://picsum.photos/seed/john/100',
      email: 'john@example.com',
      role: 'Admin'
    },
    {
      id: 'user-2',
      name: 'Jane Smith',
      avatar: 'https://picsum.photos/seed/jane/100',
      email: 'jane@example.com',
      role: 'Support'
    },
    {
      id: 'user-3',
      name: 'Bob Johnson',
      avatar: 'https://picsum.photos/seed/bob/100',
      email: 'bob@example.com',
      role: 'Developer'
    },
    {
      id: 'user-4',
      name: 'Alice Brown',
      avatar: 'https://picsum.photos/seed/alice/100',
      email: 'alice@example.com',
      role: 'User'
    },
    {
      id: 'user-5',
      name: 'Charlie Davis',
      avatar: 'https://picsum.photos/seed/charlie/100',
      email: 'charlie@example.com',
      role: 'User'
    },
    {
      id: 'user-6',
      name: 'Diana Evans',
      avatar: 'https://picsum.photos/seed/diana/100',
      email: 'diana@example.com',
      role: 'User'
    },
    {
      id: 'user-7',
      name: 'Ethan Foster',
      avatar: 'https://picsum.photos/seed/ethan/100',
      email: 'ethan@example.com',
      role: 'User'
    }
  ]);

  const [selectedTicket, setSelectedTicket] = useState<Ticket | undefined>();
  const [showAddTicketModal, setShowAddTicketModal] = useState(false);
  const [newTicketTitle, setNewTicketTitle] = useState('');
  const [newTicketDescription, setNewTicketDescription] = useState('');
  const [newTicketPriority, setNewTicketPriority] = useState<Ticket['priority']>('medium');

  // 处理工单选择
  const handleTicketSelect = (ticket: Ticket) => {
    setSelectedTicket(ticket);
  };

  // 处理添加工单
  const handleAddTicket = () => {
    setShowAddTicketModal(true);
  };

  // 确认添加工单
  const confirmAddTicket = () => {
    if (!newTicketTitle.trim()) return;
    
    const newTicket: Ticket = {
      id: `ticket-${Date.now()}`,
      title: newTicketTitle.trim(),
      description: newTicketDescription.trim(),
      status: 'open',
      priority: newTicketPriority,
      assignee: undefined,
      reporter: 'user-1', // 当前用户
      createdAt: new Date(),
      updatedAt: new Date(),
      tags: []
    };
    
    setTickets([newTicket, ...tickets]);
    setShowAddTicketModal(false);
    setNewTicketTitle('');
    setNewTicketDescription('');
    setNewTicketPriority('medium');
  };

  // 处理编辑工单
  const handleEditTicket = (ticket: Ticket) => {
    // 这里可以实现编辑工单的逻辑
    console.log('Edit ticket:', ticket);
  };

  // 处理删除工单
  const handleDeleteTicket = (ticket: Ticket) => {
    if (window.confirm(`Are you sure you want to delete ticket "${ticket.title}"?`)) {
      setTickets(tickets.filter(t => t.id !== ticket.id));
      if (selectedTicket?.id === ticket.id) {
        setSelectedTicket(undefined);
      }
    }
  };

  // 处理更新状态
  const handleUpdateStatus = (ticketId: string, status: Ticket['status']) => {
    setTickets(tickets.map(t => 
      t.id === ticketId ? { ...t, status, updatedAt: new Date() } : t
    ));
    if (selectedTicket?.id === ticketId) {
      setSelectedTicket({ ...selectedTicket, status, updatedAt: new Date() });
    }
  };

  // 处理更新优先级
  const handleUpdatePriority = (ticketId: string, priority: Ticket['priority']) => {
    setTickets(tickets.map(t => 
      t.id === ticketId ? { ...t, priority, updatedAt: new Date() } : t
    ));
    if (selectedTicket?.id === ticketId) {
      setSelectedTicket({ ...selectedTicket, priority, updatedAt: new Date() });
    }
  };

  // 处理更新负责人
  const handleUpdateAssignee = (ticketId: string, assigneeId?: string) => {
    setTickets(tickets.map(t => 
      t.id === ticketId ? { ...t, assignee: assigneeId, updatedAt: new Date() } : t
    ));
    if (selectedTicket?.id === ticketId) {
      setSelectedTicket({ ...selectedTicket, assignee: assigneeId, updatedAt: new Date() });
    }
  };

  // 处理添加标签
  const handleAddTag = (ticketId: string, tag: string) => {
    setTickets(tickets.map(t => 
      t.id === ticketId ? { ...t, tags: [...t.tags, tag], updatedAt: new Date() } : t
    ));
    if (selectedTicket?.id === ticketId) {
      setSelectedTicket({ ...selectedTicket, tags: [...selectedTicket.tags, tag], updatedAt: new Date() });
    }
  };

  // 处理移除标签
  const handleRemoveTag = (ticketId: string, tag: string) => {
    setTickets(tickets.map(t => 
      t.id === ticketId ? { ...t, tags: t.tags.filter(t => t !== tag), updatedAt: new Date() } : t
    ));
    if (selectedTicket?.id === ticketId) {
      setSelectedTicket({ ...selectedTicket, tags: selectedTicket.tags.filter(t => t !== tag), updatedAt: new Date() });
    }
  };

  return (
    <Box>
      <Flex gap={8} flexDirection={{ base: 'column', lg: 'row' }}>
        {/* 左侧工单列表 */}
        <Box flex={1}>
          <TicketList 
            tickets={tickets}
            users={users}
            onTicketSelect={handleTicketSelect}
            onAddTicket={handleAddTicket}
            onEditTicket={handleEditTicket}
            onDeleteTicket={handleDeleteTicket}
            onUpdateStatus={handleUpdateStatus}
            onUpdatePriority={handleUpdatePriority}
            onUpdateAssignee={handleUpdateAssignee}
            selectedTicket={selectedTicket}
          />
        </Box>

        {/* 右侧工单详情 */}
        {selectedTicket && (
          <Box flex={1}>
            <TicketDetail 
              ticket={selectedTicket}
              users={users}
              onUpdateStatus={(status) => handleUpdateStatus(selectedTicket.id, status)}
              onUpdatePriority={(priority) => handleUpdatePriority(selectedTicket.id, priority)}
              onUpdateAssignee={(assigneeId) => handleUpdateAssignee(selectedTicket.id, assigneeId)}
              onAddTag={(tag) => handleAddTag(selectedTicket.id, tag)}
              onRemoveTag={(tag) => handleRemoveTag(selectedTicket.id, tag)}
              onClose={() => setSelectedTicket(undefined)}
            />
          </Box>
        )}
      </Flex>

      {/* 添加工单模态框 */}
      <Modal isOpen={showAddTicketModal} onClose={() => setShowAddTicketModal(false)} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create New Ticket</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isRequired mb={4}>
              <FormLabel>Title</FormLabel>
              <Input 
                placeholder="Enter ticket title"
                value={newTicketTitle}
                onChange={(e) => setNewTicketTitle(e.target.value)}
              />
            </FormControl>
            <FormControl isRequired mb={4}>
              <FormLabel>Description</FormLabel>
              <Input 
                placeholder="Enter ticket description"
                value={newTicketDescription}
                onChange={(e) => setNewTicketDescription(e.target.value)}
                as="textarea"
                rows={6}
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Priority</FormLabel>
              <Select 
                value={newTicketPriority}
                onChange={(e) => setNewTicketPriority(e.target.value as Ticket['priority'])}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </Select>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => setShowAddTicketModal(false)}>Cancel</Button>
            <Button colorScheme="blue" onClick={confirmAddTicket}>
              Create Ticket
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

// 导出组件
export { TicketList, TicketDetail, StatusFlow, PriorityTag };
export default TicketManagement;