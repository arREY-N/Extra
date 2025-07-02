package dev.project.extra.exception;

public class DuplicateUsernameException extends RuntimeException {
    public DuplicateUsernameException(String message) { super(message); }
}