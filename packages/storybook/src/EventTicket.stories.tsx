import type { Meta, StoryObj } from "@storybook/react";

import { Comparison, type ComparisonArgs, comparisonArgs } from "./Comparison";
import { eventTicket1 } from "./fixtures/event-ticket-1";
import { eventTicket2 } from "./fixtures/event-ticket-2";
import { eventTicket3 } from "./fixtures/event-ticket-3";
import { eventTicket4 } from "./fixtures/event-ticket-4";
import { eventTicket5 } from "./fixtures/event-ticket-5";

const meta: Meta<ComparisonArgs> = {
  title: "Pass styles/Event ticket",
  id: "event-ticket",
  render: (args, context) => <Comparison {...args} scenarioId={context.id} />,
  tags: ["autodocs", "vrt"],
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
  name: "Event ticket — primary, header and secondary fields",
  args: comparisonArgs("event-ticket--event-ticket-1", eventTicket1),
  parameters: { __id: "event-ticket--event-ticket-1" },
};

export const EventTicket2: Story = {
  name: "Event ticket — auxiliary field density",
  args: comparisonArgs("event-ticket--event-ticket-2", eventTicket2),
  parameters: { __id: "event-ticket--event-ticket-2" },
};

export const EventTicket3: Story = {
  name: "Event ticket — five-column density",
  args: comparisonArgs("event-ticket--event-ticket-3", eventTicket3),
  parameters: { __id: "event-ticket--event-ticket-3" },
};

export const EventTicket4: Story = {
  name: "Event ticket — compact field layout",
  args: comparisonArgs("event-ticket--event-ticket-4", eventTicket4),
  parameters: { __id: "event-ticket--event-ticket-4" },
};

export const EventTicket5: Story = {
  name: "Generic layout filed as event-ticket fixture",
  args: comparisonArgs("event-ticket--event-ticket-5", eventTicket5),
  parameters: { __id: "event-ticket--event-ticket-5" },
};
