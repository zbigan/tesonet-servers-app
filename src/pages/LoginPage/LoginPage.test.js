import React from 'react';
import 'regenerator-runtime/runtime';
import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import LoginPage from './';
import { useAuth } from "../../context/auth";
jest.mock("../../context/auth");


describe("Testing error messages in 'LoginPage' component", () => {
    it("Shows error message after trying to log in with wrong credentials", async () => {
        const wrongUsername = 'wrong-username';
        const wrongPassword = 'wrong-password';
        
        useAuth.mockReturnValue({
            setAuthToken: () => {},
            authToken: 'fake-token'
        });
        
        render(
            <BrowserRouter>
                <LoginPage />
            </BrowserRouter>
        );
        const usernameInput = screen.getByLabelText('Username:');
        const passwordInput = screen.getByLabelText('Password:');
        const logInButton = screen.getByText('Log In');
    
        expect(usernameInput).toBeTruthy();
        expect(passwordInput).toBeTruthy();
        expect(logInButton).toBeTruthy();

        fireEvent.change(usernameInput, { target: { value: wrongUsername } });
        fireEvent.change(passwordInput, { target: { value: wrongPassword } });
        
        expect(screen.getByRole('form')).toHaveFormValues({
            username: wrongUsername,
            password: wrongPassword,
        })
        fireEvent.click(logInButton);

        await waitFor(() => expect(screen.getByText("Wrong username and/or password")).toBeTruthy());
    });
});
