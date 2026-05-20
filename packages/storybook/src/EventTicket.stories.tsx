import type { Meta, StoryObj } from "@storybook/react";

import { Comparison, type ComparisonArgs } from "./Comparison";
import { eventTicket1 } from "./fixtures/event-ticket-1";
import { eventTicket2 } from "./fixtures/event-ticket-2";
import { eventTicket3 } from "./fixtures/event-ticket-3";
import { eventTicket4 } from "./fixtures/event-ticket-4";
import { eventTicket5 } from "./fixtures/event-ticket-5";

const meta: Meta<ComparisonArgs> = {
  title: "Event ticket",
  render: (args) => <Comparison {...args} />,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "eventTicket — pre-event poster and day-of layouts, with and without seat/holder secondary fields.",
      },
    },
  },
};
export default meta;

type Story = StoryObj<ComparisonArgs>;

export const EventTicket1: Story = {
  name: "Event ticket 1",
  args: { values: eventTicket1, screenshot: "event-ticket-1" },
};

export const EventTicket2: Story = {
  name: "Event ticket 2",
  args: { values: eventTicket2, screenshot: "event-ticket-2" },
};

export const EventTicket3: Story = {
  name: "Event ticket 3",
  args: { values: eventTicket3, screenshot: "event-ticket-3" },
};

export const EventTicket4: Story = {
  name: "Event ticket 4",
  args: { values: eventTicket4, screenshot: "event-ticket-4" },
};

export const EventTicket5: Story = {
  name: "Event ticket 5",
  args: { values: eventTicket5, screenshot: "event-ticket-5" },
};
