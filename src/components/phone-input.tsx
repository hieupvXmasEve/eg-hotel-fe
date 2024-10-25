"use client";

import React from "react";
import { Input, InputProps } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface PhoneInputProps extends Omit<InputProps, "onChange"> {
  onChange: (value: string) => void;
}

const PhoneInput = React.forwardRef<HTMLInputElement, PhoneInputProps>(
  ({ className, onChange, ...props }, ref) => {
    const formatPhoneNumber = (value: string) => {
      const phoneNumber = value.replace(/[^\d]/g, "");
      const phoneNumberLength = phoneNumber.length;
      if (phoneNumberLength < 4) return phoneNumber;
      if (phoneNumberLength < 7)
        return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const formattedValue = formatPhoneNumber(event.target.value);
      onChange(formattedValue);
    };

    return (
      <Input
        {...props}
        type="tel"
        className={cn("font-mono", className)}
        onChange={handleChange}
        ref={ref}
      />
    );
  },
);

PhoneInput.displayName = "PhoneInput";

export default PhoneInput;
