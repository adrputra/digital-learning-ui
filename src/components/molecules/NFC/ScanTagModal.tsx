import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { Modal, Text } from '@mantine/core';
import { useEffect, useState } from 'react';

interface Props {
  open: boolean;
  close: () => void;
  timerInitialValue?: number;
}

export default function ScanTagModal({ open, close, timerInitialValue = 30 }: Props) {
  const [seconds, setSeconds] = useState<number>(timerInitialValue);

  useEffect(() => {
    if (seconds <= 0) {return;} // Stop countdown at 0

    const timer = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer); // Cleanup timer on unmount
  }, [seconds]);
  
  return (
    <Modal opened={open} onClose={close} centered closeOnClickOutside={false} title={<Text fw='bold'>Scan NFC Tag ({seconds})</Text>}>
      <DotLottieReact src="https://lottie.host/63442dc5-fd99-4b40-ad9a-2a3ac8e15ad9/tgy0ET8YuR.lottie" loop autoplay />
    </Modal>
  );
}
