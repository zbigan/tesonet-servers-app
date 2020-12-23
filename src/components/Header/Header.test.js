import React from 'react';
import {render} from '@testing-library/react';
import Header from './';
import { useAuth } from "../../context/auth";
jest.mock("../../context/auth");


describe("visibility of log out button in 'Header' component", () => {
    it("is not visible when token is truthy", () => {
        useAuth.mockReturnValue({
            setAuthToken: () => {},
            authToken: 'fake-token'
        });
        const { getByText } = render(<Header />);
        const logOutButton = getByText('Log Out');
  
        expect(logOutButton).toBeTruthy();
    });

    it("is visible when token is falsy", () => {
        useAuth.mockReturnValue({
            setAuthToken: () => {},
            authToken: ''
        });
        const { queryByText } = render(<Header />);
        const logOutButton = queryByText('Log Out');
  
        expect(logOutButton).toBeNull();
    });
});