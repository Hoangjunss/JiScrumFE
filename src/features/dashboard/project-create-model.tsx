import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CalendarIcon, Loader2, AlertCircle } from 'lucide-react';
import { AlertDialogTitle, AlertDialogHeader, AlertDialogDescription, AlertDialog, AlertDialogContent } from '@/components/ui/alert-dialog';
import { createProject, CreateProjectDTO, ProjectDTO } from '@/lib/api/project';

interface CreateProjectModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: (newProject: ProjectDTO) => void;
}

interface FormData {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  status: string;
}

const initialFormData: FormData = {
  name: '',
  description: '',
  startDate: '',
  endDate: '',
  status: 'PLANNING'
};

const PROJECT_STATUS_OPTIONS = [
  { value: 'PLANNING', label: 'PLANNING' },
  { value: 'ACTIVE', label: 'ACTIVE' },
  { value: 'ON_HOLD', label: 'ON_HOLD' },
  { value: 'COMPLETED', label: 'COMPLETED' },
  { value: 'CANCELED', label: 'CANCELED' }
];

export default function CreateProjectModal({ 
  open, 
  onOpenChange, 
  onSuccess 
}: CreateProjectModalProps) {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Reset form khi đóng modal
  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      setFormData(initialFormData);
      setError(null);
    }
    onOpenChange(newOpen);
  };

  // Cập nhật form data
  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error khi user bắt đầu sửa
    if (error) setError(null);
  };

  // Validate form
  const validateForm = (): string | null => {
    if (!formData.name.trim()) {
      return 'Tên dự án không được để trống';
    }
    
    if (formData.name.length < 3) {
      return 'Tên dự án phải có ít nhất 3 ký tự';
    }
    
    if (!formData.startDate) {
      return 'Ngày bắt đầu không được để trống';
    }
    
    if (!formData.endDate) {
      return 'Ngày kết thúc không được để trống';
    }
    
    if (new Date(formData.startDate) >= new Date(formData.endDate)) {
      return 'Ngày kết thúc phải sau ngày bắt đầu';
    }
    
    return null;
  };

  // Submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const projectData: CreateProjectDTO = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        startDate: formData.startDate,
        endDate: formData.endDate,
        status: formData.status
      };
      
      const newProject = await createProject(projectData);
      
      // Success callback
      onSuccess?.(newProject);
      
      // Close modal
      handleOpenChange(false);
      
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Có lỗi xảy ra khi tạo dự án');
    } finally {
      setLoading(false);
    }
  };

  // Format date cho input type="date"
  const formatDateForInput = (dateString: string) => {
    if (!dateString) return '';
    return new Date(dateString).toISOString().split('T')[0];
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5" />
            New Project
          </DialogTitle>
          <DialogDescription>
            Please fill in the information to create a new project. Fields marked with * are required.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Error Alert */}
          {error && (
            <AlertDialog>
                <AlertDialogContent className="sm:max-w-[420px]">
                <AlertDialogHeader>
                    <AlertDialogTitle className="flex items-center gap-2 text-destructive">
                    <AlertCircle className="h-4 w-4" />
                    There was an error
                    </AlertDialogTitle>

                    <AlertDialogDescription>
                    {error}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                </AlertDialogContent>
            </AlertDialog>
            )}


          {/* Tên dự án */}
          <div className="space-y-2">
            <Label htmlFor="name">
              Project Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              placeholder="Enter project name..."
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              disabled={loading}
              className="w-full"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Enter project description..."
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              disabled={loading}
              rows={3}
              className="w-full resize-none"
            />
          </div>

          {/* Status */}
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value) => handleInputChange('status', value)}
              disabled={loading}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                {PROJECT_STATUS_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Ngày bắt đầu & kết thúc */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">
                Start Date <span className="text-red-500">*</span>
              </Label>
              <Input
                id="startDate"
                type="date"
                value={formData.startDate}
                onChange={(e) => handleInputChange('startDate', e.target.value)}
                disabled={loading}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="endDate">
                End Date <span className="text-red-500">*</span>
              </Label>
              <Input
                id="endDate"
                type="date"
                value={formData.endDate}
                onChange={(e) => handleInputChange('endDate', e.target.value)}
                disabled={loading}
                min={formData.startDate} // Không cho chọn ngày trước startDate
              />
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="min-w-[100px]"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                'Create Project'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}