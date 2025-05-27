import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { axe } from "jest-axe";
import Button from "./Button";

describe("Button", () => {
  it("renders children correctly", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("calls onClick handler when clicked", () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    fireEvent.click(screen.getByText("Click me"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("does not call onClick when disabled", () => {
    const handleClick = vi.fn();
    render(
      <Button onClick={handleClick} disabled>
        Click me
      </Button>
    );
    fireEvent.click(screen.getByText("Click me"));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("applies correct classes for primary variant", () => {
    const { container } = render(
      <Button variant="primary">Primary Button</Button>
    );
    const button = container.firstChild as HTMLElement;
    expect(button).toHaveClass("bg-foreground");
    expect(button).toHaveClass("text-background");
  });

  it("applies correct classes for secondary variant", () => {
    const { container } = render(
      <Button variant="secondary">Secondary Button</Button>
    );
    const button = container.firstChild as HTMLElement;
    expect(button).toHaveClass("bg-transparent");
    expect(button).toHaveClass("text-foreground");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Button>Accessible Button</Button>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("has no accessibility violations when disabled", async () => {
    const { container } = render(<Button disabled>Disabled Button</Button>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
