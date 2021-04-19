import React from "react";
import { render, waitFor } from "@testing-library/react";
import fetchMock from 'fetch-mock';
import userEvent from '@testing-library/user-event'
import Form from "../../pages/index";
import { emailErrorMessage, mobileErrorMessage, requiredErrorMessage, successMessage } from "../../utils/const"

fetchMock.config.overwriteRoutes = true;

describe('Form page', () => {
  const renderForm = () => {
    return render(<Form />);
  }
  describe('Testing UI', () => {
    it("should render the form on the page", () => {
      const { getByText } = renderForm();

      expect(getByText("Join the waiting list.")).toBeInTheDocument();
    });

    it("should show required email error", async () => {
      const { getByText } = renderForm();

      userEvent.click(getByText("Email Address"));
      userEvent.click(getByText("Mobile Number"));

      await waitFor(() => {
        expect(getByText(requiredErrorMessage)).toBeInTheDocument();
      })
    });

    it("should show invalid email error", async () => {
      const { getByText } = renderForm();
      const emailField = getByText("Email Address");

      userEvent.click(emailField);
      userEvent.type(emailField, 'testUsername');
      userEvent.click(getByText("Mobile Number"));

      await waitFor(() => {
        expect(getByText(emailErrorMessage)).toBeInTheDocument();
      })
    });

    it("should show required mobile error", async () => {
      const { getByText } = renderForm();

      userEvent.click(getByText("Mobile Number"));
      userEvent.click(getByText("Email Address"));

      await waitFor(() => {
        expect(getByText(requiredErrorMessage)).toBeInTheDocument();
      })
    });

    it("should show invalid mobile number error", async () => {
      const { getByText } = renderForm();
      const mobileField = getByText("Mobile Number");

      userEvent.click(mobileField);
      userEvent.type(mobileField, 'a123');
      userEvent.click(getByText("Email Address"));

      await waitFor(() => {
        expect(getByText(mobileErrorMessage)).toBeInTheDocument();
      })
    });

    it("should disable submit button if fields have an error", async () => {
      const { getByText } = renderForm();

      userEvent.click(getByText("Mobile Number"));
      userEvent.click(getByText("Email Address"));

      await waitFor(() => {
        expect(getByText('Submit').closest('button')).toBeDisabled();
      })
    });

  });

  describe('Testing fetch response', () => {
    beforeEach(() => {
      fetch.resetMocks();
    });

    it("should show success message", async () => {
      fetch.mockResponseOnce({ status: 200});
      const { getByText, getByTestId } = renderForm();

      userEvent.type(getByText("Email Address"), 'testUser@test.com');
      userEvent.type(getByText("Mobile Number"), '12345678');
      userEvent.click(getByText("Submit"));

      await waitFor(() => {
        expect(getByTestId('loading')).toBeInTheDocument();
      });

      await waitFor(() => {
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(getByText(successMessage)).toBeInTheDocument();
      });
    });

    it("should error with response message", async () => {
      fetch.mockResponse(JSON.stringify({ "message": "Existing user message" }), {status: 400});
      const { getByText } = renderForm();

      userEvent.type(getByText("Email Address"), 'alreadysubscribed@test.com');
      userEvent.type(getByText("Mobile Number"), '12345678');
      userEvent.click(getByText("Submit"));

      await waitFor(() => {
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(getByText("Existing user message")).toBeInTheDocument();
      });
    });
  });
});
