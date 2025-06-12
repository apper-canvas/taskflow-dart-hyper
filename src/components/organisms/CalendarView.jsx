import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  format, 
  startOfWeek, 
  endOfWeek, 
  startOfMonth, 
  endOfMonth, 
  eachDayOfInterval, 
  isSameMonth, 
  isSameDay, 
  addMonths, 
  subMonths,
  parseISO,
  isValid
} from 'date-fns';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import TaskCard from '@/components/molecules/TaskCard';
import { toast } from 'react-toastify';

const CalendarView = ({
  tasks,
  projects,
  onEditTask,
  onDeleteTask,
  onStatusChange,
  onUpdateTask,
  getProjectName,
  getProjectColor
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [draggedTask, setDraggedTask] = useState(null);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const calendarStart = startOfWeek(monthStart);
  const calendarEnd = endOfWeek(monthEnd);
  
  const calendarDays = eachDayOfInterval({
    start: calendarStart,
    end: calendarEnd
  });

  const navigateMonth = (direction) => {
    setCurrentDate(prev => direction === 'next' ? addMonths(prev, 1) : subMonths(prev, 1));
  };

  const getTasksForDate = useCallback((date) => {
    return tasks.filter(task => {
      if (!task.dueDate) return false;
      try {
        const taskDate = parseISO(task.dueDate);
        return isValid(taskDate) && isSameDay(taskDate, date);
      } catch {
        return false;
      }
    });
  }, [tasks]);

  const handleDragStart = (e, task) => {
    setDraggedTask(task);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', task.id);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = async (e, date) => {
    e.preventDefault();
    
    if (!draggedTask) return;

    try {
      const formattedDate = format(date, 'yyyy-MM-dd');
      const updatedTask = {
        ...draggedTask,
        dueDate: formattedDate
      };

      await onUpdateTask(updatedTask);
      toast.success('Task date updated successfully');
    } catch (error) {
      toast.error('Failed to update task date');
    } finally {
      setDraggedTask(null);
    }
  };

  const handleDragEnd = () => {
    setDraggedTask(null);
  };

  const isToday = (date) => isSameDay(date, new Date());
  const isCurrentMonth = (date) => isSameMonth(date, currentDate);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-surface-200">
      {/* Calendar Header */}
      <div className="flex items-center justify-between p-4 border-b border-surface-200">
        <div className="flex items-center space-x-4">
          <h2 className="text-lg font-semibold text-surface-900">
            {format(currentDate, 'MMMM yyyy')}
          </h2>
          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigateMonth('prev')}
              icon={ApperIcon}
              iconProps={{ name: "ChevronLeft", size: 16 }}
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCurrentDate(new Date())}
              className="px-3 py-1 text-xs"
            >
              Today
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigateMonth('next')}
              icon={ApperIcon}
              iconProps={{ name: "ChevronRight", size: 16 }}
            />
          </div>
        </div>
        <div className="text-sm text-surface-600">
          {tasks.length} task{tasks.length !== 1 ? 's' : ''} this month
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="p-4">
        {/* Weekday Headers */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="p-2 text-center text-xs font-medium text-surface-600">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-1">
          <AnimatePresence mode="wait">
            {calendarDays.map((date, index) => {
              const dayTasks = getTasksForDate(date);
              const isCurrentMonthDate = isCurrentMonth(date);
              const isTodayDate = isToday(date);

              return (
                <motion.div
                  key={`${format(date, 'yyyy-MM-dd')}-${index}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.005 }}
                  className={`
                    min-h-[120px] p-2 border border-surface-100 rounded-md
                    ${isCurrentMonthDate ? 'bg-white' : 'bg-surface-50'}
                    ${isTodayDate ? 'ring-2 ring-primary/20 bg-primary/5' : ''}
                    hover:bg-surface-50 transition-colors
                  `}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, date)}
                >
                  {/* Date Number */}
                  <div className={`
                    text-xs font-medium mb-1
                    ${isCurrentMonthDate ? 'text-surface-900' : 'text-surface-400'}
                    ${isTodayDate ? 'text-primary font-semibold' : ''}
                  `}>
                    {format(date, 'd')}
                  </div>

                  {/* Tasks for this date */}
                  <div className="space-y-1">
                    {dayTasks.slice(0, 3).map((task, taskIndex) => (
                      <div
                        key={task.id}
                        className="transform scale-90 origin-top-left"
                      >
                        <TaskCard
                          task={task}
                          index={taskIndex}
                          onEdit={onEditTask}
                          onDelete={onDeleteTask}
                          onStatusChange={onStatusChange}
                          projectName={getProjectName(task.projectId)}
                          projectColor={getProjectColor(task.projectId)}
                          draggable={true}
                          onDragStart={handleDragStart}
                          onDragEnd={handleDragEnd}
                          isDragged={draggedTask?.id === task.id}
                          hideStatusSelect={true}
                        />
                      </div>
                    ))}
                    
                    {/* Show overflow indicator */}
                    {dayTasks.length > 3 && (
                      <div className="text-xs text-surface-500 px-2 py-1 bg-surface-100 rounded text-center">
                        +{dayTasks.length - 3} more
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default CalendarView;