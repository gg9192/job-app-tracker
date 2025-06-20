import { render, screen, fireEvent, within } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { SearchApplicationComponent } from "@/components/searchApplicationsComponent";

describe.only("SearchApplicationComponent", () => {
    it("renders input and search button", () => {
        render(<SearchApplicationComponent />);
        expect(screen.getByPlaceholderText(/search by company/i)).toBeInTheDocument();
        expect(screen.getByText("Add a Tag")).toBeInTheDocument();
    });

    it.only("opens and closes popover when clicking 'Add a Tag' button", () => {
        render(<SearchApplicationComponent />);
        const addButton = screen.getByText("Add a Tag")
        fireEvent.click(addButton);
        expect(screen.getByPlaceholderText(/search tag/i)).toBeInTheDocument();

        fireEvent.click(addButton);
        expect(screen.queryByPlaceholderText(/search tag/i)).not.toBeInTheDocument();
    });

    it("adds a tag when selecting from the popover list", () => {
        render(<SearchApplicationComponent />);
        const addButton = screen.getByText("Add a Tag");
        fireEvent.click(addButton);

        const tagItem = screen.getByText("FAANG");
        fireEvent.click(tagItem);

        expect(screen.getByText("FAANG")).toBeInTheDocument();
    });

    it("removes a tag when clicking the 'x' button on the tag badge", () => {
        render(<SearchApplicationComponent />);
        const addButton = screen.getByText("Add a Tag");
        fireEvent.click(addButton);
        fireEvent.click(screen.getByText("FAANG"));
        const removeButton = screen.getByRole("button", { name: "x" });
        fireEvent.click(removeButton);
        expect(screen.queryByText("FAANG")).not.toBeInTheDocument();
    });

    it("toggles tag selection on repeated clicks in the popover", () => {
        render(<SearchApplicationComponent />);
        const addButton = screen.getByText("Add a Tag");
        fireEvent.click(addButton);
        fireEvent.click(screen.getByText("FAANG"));
        expect(screen.getByText("FAANG")).toBeInTheDocument();

        fireEvent.click(addButton);
        fireEvent.click(
            within(screen.getByTestId("command")).getByText("FAANG")
        );
        expect(screen.queryByText("FAANG")).not.toBeInTheDocument();
    });
});
