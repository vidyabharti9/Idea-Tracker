// src/components/Home.jsx
import React, { useState } from "react";
import { useUser } from "../lib/context/user";
import { useIdeas } from "../lib/context/ideas";
import "./Home.css"; // Import the CSS file

export function Home() {
  const { current: user } = useUser();
  const ideas = useIdeas();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Input Validations
    if (!title.trim()) {
      setSubmitError("Title cannot be empty.");
      return;
    }
    if (!description.trim()) {
      setSubmitError("Description cannot be empty.");
      return;
    }
    if (!user || !user.$id) {
      setSubmitError("User is not properly authenticated.");
      return;
    }

    // Prepare Idea Data
    const newIdea = {
      title,
      description,
      // Islogin: true, // Adjust based on your logic
      userId: user.$id,
    };

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      await ideas.add(newIdea);
      setTitle("");
      setDescription("");
    } catch (error) {
      setSubmitError("Failed to submit idea. Please try again.");
      console.error("Submit Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Submit Idea Section */}
      {user ? (
        <section className="submit-idea-section">
          <h2>Submit Idea</h2>
          <form className="submit-idea-form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              className="form-input"
              required
            />
            <textarea
              placeholder="Description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              className="form-textarea"
              required
            />
            {submitError && <p className="error-message">{submitError}</p>}
            <button type="submit" className="submit-button" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </form>
        </section>
      ) : (
        <section className="login-prompt-section">
          <p>Please log in to submit an idea.</p>
        </section>
      )}

      {/* Latest Ideas Section */}
      <section className="ideas-section">
        <h2>Latest Ideas</h2>
        <ul className="ideas-list">
          {ideas.current && ideas.current.length > 0 ? (
            ideas.current.map((idea) => (
              <li key={idea.$id} className="idea-item">
                <h3 className="idea-title">{idea.title}</h3>
                <p className="idea-description">{idea.description}</p>
                {user && user.$id === idea.userId && (
                  <button
                    type="button"
                    className="remove-button"
                    onClick={() => ideas.remove(idea.$id)}
                  >
                    Remove
                  </button>
                )}
              </li>
            ))
          ) : (
            <p>No ideas found.</p>
          )}
        </ul>
      </section>
    </>
  );
}
