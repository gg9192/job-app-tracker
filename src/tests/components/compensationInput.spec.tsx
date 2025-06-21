import { render, screen } from "@testing-library/react";
import { useForm } from "react-hook-form";
import CompensationInputBox from "@/components/compensationInputBox";
import userEvent from "@testing-library/user-event";

function Wrapper() {
    const { register, control } = useForm({
        defaultValues: {
            compensation: "",
            compType: "",
        },
    });

    return (
        <CompensationInputBox register={register} control={control} field="compensation" />
    );
}

describe("CompensationInputBox", () => {
    beforeAll(() => {
        Element.prototype.hasPointerCapture = () => false;
    });

    it("renders number input and select placeholder", () => {
        render(<Wrapper />);
        expect(screen.getByRole("spinbutton")).toBeInTheDocument();
        expect(screen.getByText("Pay type")).toBeInTheDocument();
    });

    it("shows select options on combobox click", async () => {
        render(<Wrapper />);
        await userEvent.click(screen.getByRole("combobox"));
        expect(screen.getByText("Hourly")).toBeInTheDocument();
        expect(screen.getByText("Yearly")).toBeInTheDocument();
    });
});
