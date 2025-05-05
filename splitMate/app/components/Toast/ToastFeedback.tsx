import React, { createContext, useContext, useState, useCallback } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

export enum EToastVariants {
  SUCCESS = 'success',
  ERROR = 'error',
  INFO = 'info',
}

interface ToastContextProps {
  showToast: (options: { message: string; variant?: EToastVariants }) => void;
}

const ToastContext = createContext<ToastContextProps>({ showToast: () => {} });

export const useToastFeedback = () => useContext(ToastContext);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [message, setMessage] = useState('');
  const [visible, setVisible] = useState(false);
  const [variant, setVariant] = useState<EToastVariants>(EToastVariants.INFO);
  const opacity = useState(new Animated.Value(0))[0];

  const showToast = useCallback(
    ({ message, variant = EToastVariants.INFO }: { message: string; variant?: EToastVariants }) => {
      setMessage(message);
      setVariant(variant);
      setVisible(true);
  
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setTimeout(() => {
          Animated.timing(opacity, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }).start(() => setVisible(false));
        }, 2000);
      });
    },
    [opacity]
  );
  

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {visible && (
        <Animated.View style={[styles.toast, styles[variant], { opacity }]}> 
          <Text style={styles.toastText}>{message}</Text>
        </Animated.View>
      )}
    </ToastContext.Provider>
  );
};

const styles = StyleSheet.create({
  toast: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    zIndex: 1000,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  toastText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  success: {
    backgroundColor: '#38a37f',
  },
  error: {
    backgroundColor: '#d9534f',
  },
  info: {
    backgroundColor: '#5bc0de',
  },
});
