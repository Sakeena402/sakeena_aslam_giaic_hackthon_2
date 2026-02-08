"""
Unit tests for the utils module.
Tests the utility functions functionality.
"""

import pytest
from unittest.mock import patch, mock_open
from src.utils import (
    is_valid_status,
    format_task_status,
    display_error,
    display_success,
    validate_task_title,
    safe_int_input,
    confirm_action
)


class TestUtils:
    """Test cases for the utility functions."""

    def test_is_valid_status_with_boolean_true(self):
        """Test is_valid_status with boolean True."""
        assert is_valid_status(True) is True

    def test_is_valid_status_with_boolean_false(self):
        """Test is_valid_status with boolean False."""
        assert is_valid_status(False) is True

    def test_is_valid_status_with_valid_strings(self):
        """Test is_valid_status with valid string representations."""
        valid_strings = ['true', 'false', 'True', 'False', '1', '0', 'yes', 'no', 'YES', 'NO']
        for s in valid_strings:
            assert is_valid_status(s) is True

    def test_is_valid_status_with_invalid_string(self):
        """Test is_valid_status with invalid string."""
        assert is_valid_status('invalid') is False

    def test_is_valid_status_with_invalid_type(self):
        """Test is_valid_status with invalid type."""
        assert is_valid_status(123) is False

    def test_format_task_status_completed(self):
        """Test format_task_status with completed task."""
        assert format_task_status(True) == "Completed"

    def test_format_task_status_pending(self):
        """Test format_task_status with pending task."""
        assert format_task_status(False) == "Pending"

    def test_validate_task_title_valid(self):
        """Test validate_task_title with valid title."""
        assert validate_task_title("Valid Title") is True

    def test_validate_task_title_empty(self):
        """Test validate_task_title with empty title."""
        assert validate_task_title("") is False

    def test_validate_task_title_whitespace_only(self):
        """Test validate_task_title with whitespace-only title."""
        assert validate_task_title("   ") is False

    def test_validate_task_title_with_spaces(self):
        """Test validate_task_title with title containing spaces."""
        assert validate_task_title("  Title with spaces  ") is True


class TestUserInputs:
    """Test cases for user input functions."""

    @patch('builtins.input', return_value='5')
    def test_safe_int_input_valid(self, mock_input):
        """Test safe_int_input with valid integer input."""
        result = safe_int_input("Enter a number: ")
        assert result == 5

    @patch('builtins.input', side_effect=['abc', '5'])
    @patch('builtins.print')
    def test_safe_int_input_invalid_then_valid(self, mock_print, mock_input):
        """Test safe_int_input with invalid input followed by valid."""
        result = safe_int_input("Enter a number: ")
        assert result == 5

    @patch('builtins.input', side_effect=['0', '5'])  # Below min value then valid
    @patch('builtins.print')
    def test_safe_int_input_below_min_value(self, mock_print, mock_input):
        """Test safe_int_input with value below minimum."""
        result = safe_int_input("Enter a number: ", min_value=1)
        assert result == 5

    @patch('builtins.input', side_effect=['-5', '5'])  # Negative then valid
    @patch('builtins.print')
    def test_safe_int_input_negative(self, mock_print, mock_input):
        """Test safe_int_input with negative value."""
        result = safe_int_input("Enter a number: ", min_value=1)
        assert result == 5

    @patch('builtins.input', return_value='y')
    def test_confirm_action_yes(self, mock_input):
        """Test confirm_action with affirmative response."""
        result = confirm_action("Continue?")
        assert result is True

    @patch('builtins.input', return_value='n')
    def test_confirm_action_no(self, mock_input):
        """Test confirm_action with negative response."""
        result = confirm_action("Continue?")
        assert result is False

    @patch('builtins.input', return_value='Y')
    def test_confirm_action_uppercase_yes(self, mock_input):
        """Test confirm_action with uppercase affirmative response."""
        result = confirm_action("Continue?")
        assert result is True

    @patch('builtins.input', return_value='N')
    def test_confirm_action_uppercase_no(self, mock_input):
        """Test confirm_action with uppercase negative response."""
        result = confirm_action("Continue?")
        assert result is False