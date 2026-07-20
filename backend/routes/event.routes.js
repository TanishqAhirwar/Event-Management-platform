import express from "express";

import {
  createEvent,
  editEvent,
  deleteEvent,
  publishEvent,
  cancelEvent,
  completeEvent,
  getMyEvents,
} from "../controller/event.controller.js";

import {
  getEventById,
  searchEvents,
  filterEvents,
  getAllPublishedEvents,
} from "../controller/eventDiscovery.controller.js";

import { isAuthenticated } from "../middleware/isAuthenticated.js";
import { isOrganizer } from "../middleware/organizer.middileware.js";
import { upload } from "../middleware/multer.middileware.js";

const router = express.Router();

// ===========================
// Organizer Routes
// ===========================

// Create Event
router.post(
  "/create-event",
  isAuthenticated,
  isOrganizer,
  upload.single("thumbnail"),
  createEvent
);

// Get My Events
router.get(
  "/my-events",
  isAuthenticated,
  isOrganizer,
  getMyEvents
);

// Edit Event
router.put(
  "/:id",
  isAuthenticated,
  isOrganizer,
  upload.single("thumbnail"),
  editEvent
);

// Delete Event
router.delete(
  "/:id",
  isAuthenticated,
  isOrganizer,
  deleteEvent
);

// Publish Event
router.patch(
  "/:id/publish",
  isAuthenticated,
  isOrganizer,
  publishEvent
);

// Cancel Event
router.patch(
  "/:id/cancel",
  isAuthenticated,
  isOrganizer,
  cancelEvent
);

// Complete Event
router.patch(
  "/:id/complete",
  isAuthenticated,
  isOrganizer,
  completeEvent
);

// ===========================
// Public Discovery Routes
// ===========================

// Search Events
router.get("/search", searchEvents);

// Filter Events
router.get("/filter", filterEvents);

// Get All Published Events
router.get("/", getAllPublishedEvents);

// Get Event By ID
router.get("/:id", getEventById);

export default router;