import React, { useState } from "react";
import {
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightAddon,
} from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";

type SearchBarProps = {
  placeholder: string;
  onChange?: (value: string) => void;
  onEnter?: (value: string) => void;
  onClick?: (value: string) => void;
};

export const SearchBar = ({
  placeholder,
  onChange,
  onEnter,
  onClick,
}: SearchBarProps) => {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    onChange?.(value);
    setInputValue(value);
  };

  return (
    <InputGroup borderRadius={20} size="sm" backgroundColor={"white"}>
      <InputLeftElement
        pointerEvents="none"
        children={<Search2Icon color="gray.600" />}
      />
      <Input
        value={inputValue}
        type="text"
        placeholder={placeholder}
        border="1px solid #949494"
        onChange={handleChange}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onEnter?.(inputValue);
          }
        }}
      />
    </InputGroup>
  );
};
