import React from 'react';
import 'regenerator-runtime/runtime';
import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter, Route } from 'react-router-dom';
import LoginPage from './';
import { useAuth } from "../../context/auth";
jest.mock("../../context/auth");


describe("Testing error messages in 'LoginPage' component", () => {
    beforeEach(() => {
        useAuth.mockReturnValue({
            setAuthToken: () => {},
            authToken: 'fake-token'
        });
    });

    it("Shows error message after trying to log in with wrong credentials", async () => {
        const wrongUsername = 'wrong-username';
        const wrongPassword = 'wrong-password';
        
        render(
            <BrowserRouter>
                <LoginPage />
            </BrowserRouter>
        );

        expect(screen.queryByText("Wrong username and/or password")).toBeNull(); // should not be visible before submitting credentials

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

    it("Redirects to servers page after providing correct credenctials", async () => {
        const correctUsername = 'tesonet';
        const correctPassword = 'partyanimal';
        
        render(
            <BrowserRouter>
                <LoginPage />
                <Route path="/servers">Servers page</Route>
            </BrowserRouter>
        );

        expect(screen.queryByText("Servers page")).toBeNull(); //should not exist before log in

        const usernameInput = screen.getByLabelText('Username:');
        const passwordInput = screen.getByLabelText('Password:');
        const logInButton = screen.getByText('Log In');
    
        expect(usernameInput).toBeTruthy();
        expect(passwordInput).toBeTruthy();
        expect(logInButton).toBeTruthy();

        fireEvent.change(usernameInput, { target: { value: correctUsername } });
        fireEvent.change(passwordInput, { target: { value: correctPassword } });
        
        expect(screen.getByRole('form')).toHaveFormValues({
            username: correctUsername,
            password: correctPassword,
        });

        fireEvent.click(logInButton);
        
        await waitFor(() => expect(screen.getByText("Servers page")).toBeTruthy());
    });
});
