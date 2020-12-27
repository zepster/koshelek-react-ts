import React from 'react';
import styles from './index.module.css';
import { useScrollListener } from './hooks';
import { Props } from './types';

export const VList = ({
  count,
  rowHeight,
  children,
  prerenderCount,
  height,
}: Props) => {
  const { scrollTop, ref } = useScrollListener();
  // Полная высота скролла для всех элементов
  const totalListHeight = count * rowHeight;
  // Индекс первого элемента, с которого нужно начать рендер
  const startIndex = Math.max(
    // кол-во уже проскролленых элементов, без учета пререндера
    Math.floor(scrollTop / rowHeight) - prerenderCount,
    0,
  );
  // Кол-во элементов, которые нужно отрисовать
  const countToShow = Math.min(
    // сколько элементов может быть отрисовано в контейнере + пререндеры
    // для начала и конца списка
    Math.ceil(height / rowHeight) + 2 * prerenderCount,
    count - startIndex,
  );

  // виртуальный отступ (проскролленые элементы в px)
  const offsetTop = startIndex * rowHeight;

  return (
    <div
      ref={ref}
      className={styles['v-list']}
      style={{ height }}
    >
      <div style={{ height: totalListHeight }}>
        <div
          style={{
            willChange: 'transform',
            transform: `translateY(${offsetTop}px)`,
          }}
        >
          {Array.from(Array(countToShow)).map(
            (i, index) => children(index + startIndex),
          )}
        </div>
      </div>
    </div>
  );
};
