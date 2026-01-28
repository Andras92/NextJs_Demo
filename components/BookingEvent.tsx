"use client";

import { createBooking } from "@/lib/actions/booking.actions";
import posthog from "posthog-js";
import { useState } from "react";

const BookingEvent = ({ eventId, slug }: { eventId: string, slug: string }) => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    const { success } = await createBooking({ email, slug, eventId })

    if (success) {
      setSubmitted(true);
      posthog.capture("event_booked")
    } else {
      posthog.captureException('Booking creation failed')
    }
  };

  return (
    <div id="book-event">
      {submitted ? (
        <p className="text-sm">Thanks for joining this Event!</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              value={email}
              id="email"
              placeholder="Enter your email address"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <button className="button-submit" type="submit">
              Submit
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default BookingEvent;
