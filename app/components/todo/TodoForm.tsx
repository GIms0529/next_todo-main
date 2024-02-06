"use client"

import React, { useState } from 'react';
import Input from '@/app/components/Input';
import ClickButton from '@/app/components/ClickButton';

interface TodoFormProps {
    onSaveTodo: (value: string, tags: string[]) => void;
    autoCompleteTags: string[];
}

const TodoForm: React.FC<TodoFormProps> = ({ onSaveTodo, autoCompleteTags = [] }) => {
    const [inputValue, setInputValue] = useState('');
    const [tagInput, setTagInput] = useState('');
    const [tags, setTags] = useState<string[]>([]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleTagInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTagInput(event.target.value);
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && tagInput.trim() !== '') {
            setTags([...tags, tagInput.trim()]);
            setTagInput('');
        }
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSaveTodo(inputValue, tags);
        setInputValue('');
        setTags([]);
    };

    return (
        <form onSubmit={handleSubmit}>
            <Input
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Enter Todo..."
            />
            <Input
                value={tagInput}
                onChange={handleTagInputChange}
                onKeyPress={handleKeyPress}
                placeholder="Enter Tag and press Enter"
            />
            <div>
                {tags.map((tag, index) => (
                    <span key={index}>{tag}</span>
                ))}
            </div>
            <ClickButton
                label="Add"
                disabled={!inputValue}
                onClick={handleSubmit}
            />
        </form>
    );
};

export default TodoForm;
