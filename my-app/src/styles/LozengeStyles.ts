import styled from 'styled-components';

interface ColumnLozengeProps {
  statusId: number;
}

export const ColumnLozenge = styled.div<ColumnLozengeProps>`
  background-color: ${({ statusId }) => {
    switch (statusId) {
      case 0:
        return '#D4F7F3'; // Синий
      case 1:
        return '#F7F5D4'; // Зелёный
      case 2:
        return '#E7D4F7'; // Оранжевый/Желтый
      case 3:
        return '#D4E0F7'; // Красный
      default:
        return '#0052cc';
    }
  }};
  
  box-shadow: ${({ statusId }) => {
    switch (statusId) {
      case 1:
        return '0 2px 4px rgba(0, 0, 0, 0.2)';
      case 2:
        return '0 2px 8px rgba(0, 0, 0, 0.3)';
      case 3:
        return '0 2px 3px rgba(0, 0, 0, 0.15)';
      case 4:
        return '0 2px 6px rgba(0, 0, 0, 0.25)';
      default:
        return '0 2px 4px rgba(0, 0, 0, 0.2)';
    }
  }}

  color: ${({ statusId }) => {
    switch (statusId) {
      case 0:
        return '#0B6F62'; // для синего фона белый текст
      case 1:
        return '#6F690B'; // для зелёного фона белый текст
      case 2:
        return '#410B6F'; // для жёлтого фона можно использовать тёмно-серый текст
      case 3:
        return '#0B2E6F'; // для красного фона белый текст
      default:
        return '#ffffff';
    }
  }};

  
  border-radius: 20px;
  padding: 4px 12px;
  font-size: 14px;
  font-weight: bold;
  display: inline-flex;
  align-items: center;
  
  /* Стили для иконки внутри лоуженжа */
  img {
    width: 16px;
    height: 16px;
    margin-right: 8px;
  }
`;
