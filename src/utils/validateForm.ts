import { StreamerEntity } from "types";

export const validateForm = (
  values: StreamerEntity,
  touchedFields: Record<string, boolean>,
  streamersList: StreamerEntity[]
) => {
  const { name, platform, description } = values;
  const newErrors: Partial<StreamerEntity> = {};

  if (touchedFields["name"] && name.length < 3 && name.length > 0) {
    newErrors.name = "Name must be at least 3 characters long";
  }

  if (touchedFields["name"] && name.length > 100 && name.length > 3) {
    newErrors.name = "Name must be less than 100 characters";
  }

  if (touchedFields["platform"] && !platform) {
    newErrors.platform = "Please select a platform";
  }

  if (
    touchedFields["description"] &&
    description.length < 10 &&
    description.length > 0
  ) {
    newErrors.description = "Description must be at least 10 characters long";
  }

  if (touchedFields["description"] && description.length > 1000) {
    newErrors.description = "Description must be less than 1000 characters";
  }

  const isStreamerExist = streamersList.some(
    (streamer) => streamer.name === name
  );
  if (isStreamerExist) {
    newErrors.name = "Streamer with this name already exists";
  }

  return newErrors;
};
