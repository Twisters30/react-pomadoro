import { KeyboardSensor, PointerSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core";

export const useDndKitConfig = () => {

	const sensors = useSensors(useSensor(PointerSensor, {
		activationConstraint: {
			distance: 8,
		},
	}), useSensor(KeyboardSensor, {
		activationConstraint: {
			distance: 8,
		},
	}), useSensor(TouchSensor, {
		activationConstraint: {
			distance: 8,
		},
	}));
	return {
		sensors
	}
}