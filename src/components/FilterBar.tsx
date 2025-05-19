import React, { useState } from 'react';
import { 
  Box, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  TextField,
  Button,
  Grid,
  SelectChangeEvent,
  IconButton,
  useMediaQuery,
  Theme
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import FilterListIcon from '@mui/icons-material/FilterList';
import CloseIcon from '@mui/icons-material/Close';

import { TeamMember, Sprint, IssueType, FilterOptions } from '../types';
import { formatDateToISO } from '../utils/dateUtils';

interface FilterBarProps {
  teamMembers: TeamMember[];
  sprints: Sprint[];
  issueTypes: IssueType[];
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  teamMembers,
  sprints,
  issueTypes,
  filters,
  onFilterChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  
  const handleStartDateChange = (date: Date | null) => {
    onFilterChange({
      ...filters,
      startDate: date ? formatDateToISO(date) : null,
    });
  };
  
  const handleEndDateChange = (date: Date | null) => {
    onFilterChange({
      ...filters,
      endDate: date ? formatDateToISO(date) : null,
    });
  };
  
  const handleTeamMemberChange = (event: SelectChangeEvent) => {
    onFilterChange({
      ...filters,
      teamMemberId: event.target.value || null,
    });
  };
  
  const handleSprintChange = (event: SelectChangeEvent) => {
    onFilterChange({
      ...filters,
      sprintId: event.target.value || null,
    });
  };
  
  const handleIssueTypeChange = (event: SelectChangeEvent) => {
    onFilterChange({
      ...filters,
      issueTypeId: event.target.value || null,
    });
  };
  
  const handleClearFilters = () => {
    onFilterChange({
      startDate: null,
      endDate: null,
      sprintId: null,
      teamMemberId: null,
      issueTypeId: null,
    });
  };
  
  const toggleFilters = () => {
    setIsOpen(!isOpen);
  };
  
  return (
    <Box sx={{ mb: 3, p: 2, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 1 }}>
      {isMobile ? (
        <>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Button
              startIcon={<FilterListIcon />}
              onClick={toggleFilters}
              variant="outlined"
            >
              Filters
            </Button>
            {isOpen && (
              <IconButton onClick={toggleFilters}>
                <CloseIcon />
              </IconButton>
            )}
          </Box>
          
          {isOpen && (
            <Box sx={{ mt: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label="Start Date"
                      value={filters.startDate ? new Date(filters.startDate) : null}
                      onChange={handleStartDateChange}
                      slotProps={{ textField: { fullWidth: true, size: 'small' } }}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={12}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label="End Date"
                      value={filters.endDate ? new Date(filters.endDate) : null}
                      onChange={handleEndDateChange}
                      slotProps={{ textField: { fullWidth: true, size: 'small' } }}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Team Member</InputLabel>
                    <Select
                      value={filters.teamMemberId || ''}
                      label="Team Member"
                      onChange={handleTeamMemberChange}
                    >
                      <MenuItem value="">All Team Members</MenuItem>
                      {teamMembers.map((member) => (
                        <MenuItem key={member.id} value={member.id}>
                          {member.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Sprint</InputLabel>
                    <Select
                      value={filters.sprintId || ''}
                      label="Sprint"
                      onChange={handleSprintChange}
                    >
                      <MenuItem value="">All Sprints</MenuItem>
                      {sprints.map((sprint) => (
                        <MenuItem key={sprint.id} value={sprint.id}>
                          {sprint.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth size="small">
                    <InputLabel>Issue Type</InputLabel>
                    <Select
                      value={filters.issueTypeId || ''}
                      label="Issue Type"
                      onChange={handleIssueTypeChange}
                    >
                      <MenuItem value="">All Issue Types</MenuItem>
                      {issueTypes.map((type) => (
                        <MenuItem key={type.id} value={type.id}>
                          {type.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Button 
                    variant="outlined" 
                    color="secondary" 
                    onClick={handleClearFilters}
                    fullWidth
                  >
                    Clear Filters
                  </Button>
                </Grid>
              </Grid>
            </Box>
          )}
        </>
      ) : (
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={2}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Start Date"
                value={filters.startDate ? new Date(filters.startDate) : null}
                onChange={handleStartDateChange}
                slotProps={{ textField: { fullWidth: true, size: 'small' } }}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sm={2}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="End Date"
                value={filters.endDate ? new Date(filters.endDate) : null}
                onChange={handleEndDateChange}
                slotProps={{ textField: { fullWidth: true, size: 'small' } }}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sm={2}>
            <FormControl fullWidth size="small">
              <InputLabel>Team Member</InputLabel>
              <Select
                value={filters.teamMemberId || ''}
                label="Team Member"
                onChange={handleTeamMemberChange}
              >
                <MenuItem value="">All Team Members</MenuItem>
                {teamMembers.map((member) => (
                  <MenuItem key={member.id} value={member.id}>
                    {member.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={2}>
            <FormControl fullWidth size="small">
              <InputLabel>Sprint</InputLabel>
              <Select
                value={filters.sprintId || ''}
                label="Sprint"
                onChange={handleSprintChange}
              >
                <MenuItem value="">All Sprints</MenuItem>
                {sprints.map((sprint) => (
                  <MenuItem key={sprint.id} value={sprint.id}>
                    {sprint.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={2}>
            <FormControl fullWidth size="small">
              <InputLabel>Issue Type</InputLabel>
              <Select
                value={filters.issueTypeId || ''}
                label="Issue Type"
                onChange={handleIssueTypeChange}
              >
                <MenuItem value="">All Issue Types</MenuItem>
                {issueTypes.map((type) => (
                  <MenuItem key={type.id} value={type.id}>
                    {type.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={2}>
            <Button 
              variant="outlined" 
              color="secondary" 
              onClick={handleClearFilters}
              fullWidth
            >
              Clear Filters
            </Button>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default FilterBar;
