import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from './';
import { useAuth } from "../../context/auth";
jest.mock("../../context/auth");


describe("Visibility of log out button in 'Header' component", () => {
    it("Is not visible when token is truthy", () => {
        useAuth.mockReturnValue({
            setAuthToken: () => {},
            authToken: 'fake-token'
        });
        render(<Header />);
        const logOutButton = screen.getByText('Log Out');
  
        expect(logOutButton).toBeTruthy();
    });

    it("Is visible when token is falsy", () => {
        useAuth.mockReturnValue({
            setAuthToken: () => {},
            authToken: ''
        });
        render(<Header />);
        const logOutButton = screen.queryByText('Log Out');
  
        expect(logOutButton).toBeNull();
    });
});