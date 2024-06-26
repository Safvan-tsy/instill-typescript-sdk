/* eslint-disable @typescript-eslint/no-explicit-any */

import { OpenAPIV3 } from "openapi-types";
import { ConnectorDefinition, Connector } from "../connector";
import { GeneralRecord, Nullable, Spec, Visibility } from "../types";
import { JSONSchema7TypeName } from "json-schema";

import { Operation } from "../operation";
import { AxiosInstance } from "axios";

export type PipelineMode = "MODE_UNSPECIFIED" | "MODE_SYNC" | "MODE_ASYNC";

export type PipelineReleaseState =
  | "STATE_UNSPECIFIED"
  | "STATE_ACTIVE"
  | "STATE_INACTIVE"
  | "STATE_ERROR"
  | "STATE_DELETED";

export type PipelineRecipe = {
  version: string;
  components: PipelineComponent[];
};

export type RawPipelineRecipe = {
  version: string;
  components: RawPipelineComponent[];
};

export type RawPipelineComponent = {
  id: string;
  resource_name: string;
  configuration: Record<string, any>;
  definition_name: string;
};

export type PipelineReleaseWatchState = {
  state: PipelineReleaseState;
  progress: number;
};

export type PipelineComponentType =
  | "COMPONENT_TYPE_UNSPECIFIED"
  | "COMPONENT_TYPE_CONNECTOR_AI"
  | "COMPONENT_TYPE_CONNECTOR_DATA"
  | "COMPONENT_TYPE_CONNECTOR_APPLICATION"
  | "COMPONENT_TYPE_OPERATOR";

export type PipelineReleasesWatchState = Record<
  string,
  PipelineReleaseWatchState
>;

export type Permission = {
  can_edit: boolean;
  can_trigger: boolean;
};

export type Pipeline = {
  name: string;
  uid: string;
  id: string;
  description: string;
  readme: string;
  create_time: string;
  update_time: string;
  recipe: PipelineRecipe;
  openapi_schema: OpenAPIV3.Document;
  owner: Record<string, any>;
  owner_name: string;
  releases: PipelineRelease[];
  sharing: PipelineSharing;
  metadata: GeneralRecord;
  permission: Permission;
};

export type OperatorDefinition = {
  name: string;
  uid: string;
  id: string;
  title: string;
  documentation_url: string;
  icon: string;
  spec: Spec;
  tombstone: boolean;
  public: boolean;
  custom: boolean;
  icon_url: string;
};

export type PipelineSharing = {
  users: PipelineSharingUserRules;
  share_code: Nullable<PipelineSharingCodeRule>;
};

export type PipelineSharingUserRules = Record<
  string,
  | {
      enabled: boolean;
      role: PermissionRole;
    }
  | undefined
>;

export type PipelineSharingCodeRule = {
  user: string;
  code?: string;
  enabled: boolean;
  role: PermissionRole;
};

export type PermissionRole =
  | "ROLE_UNSPECIFIED"
  | "ROLE_VIEWER"
  | "ROLE_EXECUTOR";

export type PipelineRelease = {
  name: string;
  uid: string;
  id: string;
  description: string;
  recipe: PipelineRecipe;
  create_time: string;
  update_time: string;
  visibility: Visibility;
  openapi_schema: OpenAPIV3.Document;
  metadata: GeneralRecord;
};

export type PipelineTrace = {
  success: boolean;
  inputs: Record<string, any>[];
  outputs: Record<string, any>[];
  error: Record<string, any>;
  compute_time_in_seconds: number;
};

export type PipelineTriggerMetadata = {
  traces: Record<string, PipelineTrace>;
};

export type PipelineStartComponent = {
  id: "start";
  resource_name: Nullable<string>;
  resource: Nullable<Connector>;
  type: PipelineComponentType;
  definition_name: string;
  operator_definition: Nullable<OperatorDefinition>;
  configuration: {
    metadata?: StartOperatorMetadata;
  } & GeneralRecord;
};

export type PipelineOperatorComponent = {
  id: string;
  resource_name: Nullable<string>;
  resource: Nullable<Connector>;
  type: PipelineComponentType;
  definition_name: string;
  operator_definition: Nullable<OperatorDefinition>;
  configuration: GeneralRecord;
};

export type PipelineEndComponent = {
  id: "end";
  resource_name: Nullable<string>;
  resource: Nullable<Connector>;
  type: PipelineComponentType;
  definition_name: string;
  operator_definition: Nullable<OperatorDefinition>;
  configuration: Record<string, GeneralRecord>;
};

export type PipelineConnectorComponent = {
  id: string;
  resource_name: Nullable<string>;
  resource: Nullable<Connector>;
  type: PipelineComponentType;
  definition_name: string;
  connector_definition: Nullable<ConnectorDefinition>;
  configuration: GeneralRecord;
};

export type PipelineComponent =
  | PipelineStartComponent
  | PipelineEndComponent
  | PipelineConnectorComponent;

export type StartOperatorMetadata = Record<string, StartOperatorInput>;

export type StartOperatorInput = {
  title: string;
  type: StartOperatorInputType;
  instillFormat: string;
  items?: {
    type: string;
  };
  instillUiOrder?: number;
  instillUIMultiline?: boolean;
  description?: string;
};

export type StartOperatorInputType =
  | "audio/*"
  | "image/*"
  | "long_string"
  | "array:image/*"
  | "array:audio/*"
  | "array:string"
  | "*/*"
  | "array:*/*"
  | "semi-structured/object"
  | JSONSchema7TypeName;

export type StartOperatorBody = Record<string, StartOperatorInput>;

export type StartOperatorInputBodyValue = Record<string, any>;

export type StartOperatorInputSingularType =
  | "text"
  | "number"
  | "boolean"
  | "audio"
  | "image";

export type StartOperatorInputArrayType =
  | "text_array"
  | "number_array"
  | "boolean_array"
  | "audio_array"
  | "image_array";

export type TriggerUserPipelinePayload = {
  inputs: Record<string, any>[];
};

export type TriggerUserPipelineResponse = {
  outputs: Record<string, any>[];
  metadata: PipelineTriggerMetadata;
};

export type TriggerAsyncUserPipelinePayload = {
  inputs: Record<string, any>[];
};

export type TriggerAsyncUserPipelineResponse = {
  operation: Operation;
};

export type SetDefaultUserPipelineReleaseResponse = {
  release: PipelineRelease;
};

export type RestoreUserPipelineReleaseResponse = {
  release: PipelineRelease;
};

export type TriggerUserPipelineReleasePayload = {
  inputs: Record<string, any>[];
};

export type TriggerUserPipelineReleaseResponse = {
  outputs: Record<string, any>[];
  metadata: PipelineTriggerMetadata;
};

export type TriggerAsyncUserPipelineReleasePayload = {
  inputs: Record<string, any>[];
};

export type TriggerAsyncUserPipelineReleaseResponse = {
  operation: Operation;
};

export type CreateUserPipelinePayload = {
  id: string;
  description?: string;
  recipe: RawPipelineRecipe;
};

export type CreatePipelineResponse = {
  pipeline: Pipeline;
};

export type UpdateUserPipelinePayload = {
  name: string;
  description?: string;
  recipe: RawPipelineRecipe;
};

export type UpdateUserPipelineResponse = {
  pipeline: Pipeline;
};

export type RenameUserPipelinePayload = {
  name: string;
  new_pipeline_id: string;
};

export type RenameUserPipelineResponse = {
  pipeline: Pipeline;
};

export type CreateUserPipelineReleasePayload = {
  id: string;
  description?: string;
  recipe: RawPipelineRecipe;
};

export type CreateUserPipelineReleaseResponse = {
  release: PipelineRelease;
};

export type UpdateUserPipelineReleasePayload = {
  instillFormat: string;
  items?: {
    type: string;
  };
  instillUiOrder?: number;
  instillUIMultiline?: boolean;
  description?: string;
  recipe: RawPipelineRecipe;
};

export type UpdateUserPipelineReleaseResponse = {
  release: PipelineRelease;
};

export type ListPipelinesResponse = {
  pipelines: Pipeline[];
  next_page_token: string;
  total_size: number;
};

export type ListUserPipelinesResponse = {
  pipelines: Pipeline[];
  next_page_token: string;
  total_size: number;
};

export type GetUserPipelineResponse = {
  pipeline: Pipeline;
};

export type ListPipelineReleasesResponse = {
  releases: PipelineRelease[];
  next_page_token: string;
  total_size: number;
};

export type GetUserPipelineReleaseResponse = {
  release: PipelineRelease;
};

export type WatchUserPipelineReleaseResponse = {
  state: PipelineReleaseWatchState;
};

export type listPipelinesQueryParams = {
  pageSize: Nullable<number>;
  nextPageToken: Nullable<string>;
  axiosInstance: AxiosInstance;
  visibility?: Visibility;
};

export type listUserPipelinesQueryProps = {
  pageSize: Nullable<number>;
  nextPageToken: Nullable<string>;
  axiosInstance: AxiosInstance;
  userName: string;
};

export type GetOperatorDefinitionResponse = {
  operator_definition: OperatorDefinition;
};

export type ListOperatorDefinitionsResponse = {
  operator_definitions: OperatorDefinition[];
  next_page_token: string;
  total_size: number;
};
