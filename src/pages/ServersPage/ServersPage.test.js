import React from 'react';
import 'regenerator-runtime/runtime';
import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ServersPage from "./";
import { useAuth } from "../../context/auth";
jest.mock("../../context/auth");


describe("Testing sorting arrows appearance in 'ServersPage' component", () => {
    beforeEach(() => {
        useAuth.mockReturnValue({
            setAuthToken: () => {},
            authToken: 'fake-token'
        });

        render(<ServersPage/>);
    })
    
    it("Shows arrow pointed downwards after one click", async () => {
        const distanceHeader = screen.getByText('Distance (km)');
        expect(distanceHeader).toBeTruthy();

        fireEvent.click(distanceHeader);

        await waitFor(() => expect(screen.getByText("Distance (km) ↓")).toBeTruthy());
    });

    it("Shows arrow pointed upwards after two clicks", async () => {
        const distanceHeader = screen.getByText('Distance (km)');
        expect(distanceHeader).toBeTruthy();

        fireEvent.click(distanceHeader);
        fireEvent.click(distanceHeader);

        await waitFor(() => expect(screen.getByText("Distance (km) ↑")).toBeTruthy());
    });
});