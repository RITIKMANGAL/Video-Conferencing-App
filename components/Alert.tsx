import React from 'react';

interface AlertProps {
  title: string;
  iconUrl?: string;
}

const Alert: React.FC<AlertProps> = ({ title, iconUrl }) => {
  return (
    <div className="flex items-center justify-center p-4 bg-red-100 border border-red-400 text-red-700 rounded">
      {iconUrl && <img src={iconUrl} alt="Alert icon" className="mr-2 h-6 w-6" />}
      <span>{title}</span>
    </div>
  );
};

export default Alert;
