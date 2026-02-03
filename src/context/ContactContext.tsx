import React, { createContext, useContext, useState } from 'react';

interface ContactContextType {
    isOpen: boolean;
    openContact: () => void;
    closeContact: () => void;
}

const ContactContext = createContext<ContactContextType | undefined>(undefined);

export const ContactProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const openContact = () => setIsOpen(true);
    const closeContact = () => setIsOpen(false);

    return (
        <ContactContext.Provider value={{ isOpen, openContact, closeContact }}>
            {children}
        </ContactContext.Provider>
    );
};

export const useContact = () => {
    const context = useContext(ContactContext);
    if (context === undefined) {
        throw new Error('useContact must be used within a ContactProvider');
    }
    return context;
};
