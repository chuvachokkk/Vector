import styled from 'styled-components';

interface ColumnLozengeProps {
  $statusId: number;
}

export const ColumnLozenge = styled.div<ColumnLozengeProps>`
  display: inline-flex;
  align-items: center;
  background-color: ${({ $statusId }) => {
    switch ($statusId) {
      case 0: return '#D4F7F3';
      case 1: return '#F7F5D4';
      case 2: return '#E7D4F7';
      case 3: return '#D4E0F7';
      default: return '#777';
    }
  }};
  color: gray;
  border-radius: 20px;
  padding: 4px 12px;
  font-size: 14px;
  font-weight: bold;
  box-shadow: ${({ $statusId }) => {
    switch ($statusId) {
      case 0: return '0 2px 4px rgba(0, 0, 0, 0.2)';
      case 1: return '0 2px 8px rgba(0,0,0,0.3)';
      case 2: return '0 2px 3px rgba(0,0,0,0.15)';
      case 3: return '0 2px 6px rgba(0,0,0,0.25)';
      default: return '0 2px 4px rgba(0,0,0,0.2)';
    }
  }};

  img {
    width: 16px;
    height: 16px;
    margin-right: 8px;
  }
`;
