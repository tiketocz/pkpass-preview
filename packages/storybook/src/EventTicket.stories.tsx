import type { Meta, StoryObj } from "@storybook/react";

import { Comparison, type ComparisonArgs } from "./Comparison";
import { eventTicket1 } from "./fixtures/event-ticket-1";
import { eventTicket2 } from "./fixtures/event-ticket-2";

const meta: Meta<ComparisonArgs> = {
  title: "Event ticket",
  render: (args) => <Comparison {...args} />,
  parameters: { layout: "centered" },
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
