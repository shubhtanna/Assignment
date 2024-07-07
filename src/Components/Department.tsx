import React, { useState } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  Checkbox,
  IconButton,
  Collapse,
  Box
} from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

interface Department {
    id: string;
    name: string;
    children?: Department[];
  }

  const departments: Department[] = [
    {
      id: 'customer_service',
      name: 'customer_service',
      children: [
        { id: 'support', name: 'support' },
        { id: 'customer_success', name: 'customer_success'},
      ],
    },
    {
      id: 'design',
      name: 'design',
      children: [
        { id: 'graphic_design', name: 'graphic_design' },
        { id: 'product_design', name: 'product_design' },
        { id: 'web_design', name: 'web_design' },
      ],
    },
  ];



const Department:React.FC = () => {
    const [expanded, setExpanded] = useState<string[]>([]);
    const [selected, setSelected] = useState<string[]>([]);

      const handleToggle = (id: string) => {
        setExpanded(expanded.includes(id) ? expanded.filter(item => item !== id) : [...expanded, id]);
      };
    
      const handleSelect = (id: string) => {
        setSelected(selected.includes(id) ? selected.filter(item => item !== id) : [...selected, id]);
      };
    
      const handleSelectAll = (parentId: string, childIds: string[]) => {
        if (selected.includes(parentId)) {
          setSelected(selected.filter(id => !childIds.includes(id) && id !== parentId));
        } else {
          setSelected([...selected, parentId, ...childIds]);
        }
      };
    
      const handleChildSelect = (parentId: string, childId: string) => {
        const newSelected = selected.includes(childId)
          ? selected.filter(id => id !== childId)
          : [...selected, childId];
    
        const allChildrenSelected = departments
          .find(dept => dept.id === parentId)
          ?.children?.every(child => newSelected.includes(child.id));
    
        if (allChildrenSelected) {
          setSelected([...newSelected, parentId]);
        } else {
          setSelected(newSelected.filter(id => id !== parentId));
        }
      };
    
      const renderTree = (nodes: Department) => (
   
        <React.Fragment key={nodes.id}>
          <ListItem>
            {nodes.children && (
              <IconButton onClick={() => handleToggle(nodes.id)}>
                {expanded.includes(nodes.id) ? <ExpandLess /> : <ExpandMore />}
              </IconButton>
            )}
            <Checkbox
              checked={selected.includes(nodes.id)}
              onChange={() => {
                if (nodes.children) {
                  handleSelectAll(nodes.id, nodes.children.map(child => child.id));
                } else {
                  handleSelect(nodes.id);
                }
              }}
            />
            <ListItemText
              primary={`${nodes.name} ${nodes.children ? `(${nodes.children.length})` : ''}`}
            />
          </ListItem>
          {nodes.children && (
            <Collapse in={expanded.includes(nodes.id)} timeout="auto" unmountOnExit>
              <List component="div" disablePadding style={{ paddingLeft: 20 }}>
                {nodes.children.map(node => (
                  <ListItem key={node.id}>
                    <Checkbox
                      checked={selected.includes(node.id)}
                      onChange={() => handleChildSelect(nodes.id, node.id)}
                    />
                    <ListItemText primary={node.name} />
                  </ListItem>
                ))}
              </List>
            </Collapse>
          )}
        </React.Fragment>
      );
  return (
   <Box display="flex" justifyContent="center" alignItems="center" marginTop="50px">
   <Box width="50%" bgcolor="#e0e0e0" p={2} borderRadius={2}>
     <List>{departments.map(department => renderTree(department))}</List>
   </Box>
 </Box>
  )
}

export default Department