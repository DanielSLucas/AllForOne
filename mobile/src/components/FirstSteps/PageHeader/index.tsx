import React, { ReactNode } from 'react';
import { Text, View, ViewProps } from 'react-native';

import { styles } from './styles';

interface PageHeaderProps extends ViewProps {
  pageNumber: number;
  children: ReactNode;
}

export function PageHeader({
  pageNumber, 
  children, 
  ...rest
}: PageHeaderProps) {
  return (
    <View {...rest}>
      <Text style={styles.pageNumber}>
        {String(pageNumber).padStart(2, '0')}.
      </Text>
      <Text style={styles.content}>
        {children}
      </Text>
    </View>
  );
}