import { createNovuBaseClient, HttpError, NovuRestResult } from './novu-base-client';
import {
  CreateWorkflowDto,
  GeneratePreviewRequestDto,
  GeneratePreviewResponseDto,
  GetListQueryParams,
  ListWorkflowResponse,
  PatchStepDataDto,
  PatchWorkflowDto,
  StepDataDto,
  SyncWorkflowDto,
  UpdateWorkflowDto,
  WorkflowResponseDto,
  WorkflowTestDataResponseDto,
} from '../dto';

export const createWorkflowClient = (baseUrl: string, headers: HeadersInit = {}) => {
  const baseClient = createNovuBaseClient(baseUrl, headers);

  const createWorkflow = async (
    createWorkflowDto: CreateWorkflowDto
  ): Promise<NovuRestResult<WorkflowResponseDto, HttpError>> => {
    return await baseClient.safePost<WorkflowResponseDto>('/v2/workflows', createWorkflowDto);
  };

  const updateWorkflow = async (
    workflowId: string,
    updateWorkflowDto: UpdateWorkflowDto
  ): Promise<NovuRestResult<WorkflowResponseDto, HttpError>> => {
    return await baseClient.safePut<WorkflowResponseDto>(`/v2/workflows/${workflowId}`, updateWorkflowDto);
  };

  const syncWorkflow = async (
    workflowId: string,
    syncWorkflowDto: SyncWorkflowDto
  ): Promise<NovuRestResult<WorkflowResponseDto, HttpError>> => {
    return await baseClient.safePut<WorkflowResponseDto>(`/v2/workflows/${workflowId}/sync`, syncWorkflowDto);
  };

  const getWorkflow = async (workflowId: string): Promise<NovuRestResult<WorkflowResponseDto, HttpError>> => {
    return await baseClient.safeGet<WorkflowResponseDto>(`/v2/workflows/${workflowId}`);
  };

  const getWorkflowStepData = async (
    workflowId: string,
    stepId: string
  ): Promise<NovuRestResult<StepDataDto, HttpError>> => {
    return await baseClient.safeGet<StepDataDto>(`/v2/workflows/${workflowId}/steps/${stepId}`);
  };

  const patchWorkflowStepData = async (
    workflowId: string,
    stepId: string,
    patchStepDataDto: PatchStepDataDto
  ): Promise<NovuRestResult<StepDataDto, HttpError>> => {
    return await baseClient.safePatch<StepDataDto>(`/v2/workflows/${workflowId}/steps/${stepId}`, patchStepDataDto);
  };

  const patchWorkflow = async (
    workflowId: string,
    patchWorkflowDto: PatchWorkflowDto
  ): Promise<NovuRestResult<WorkflowResponseDto, HttpError>> => {
    return await baseClient.safePatch<WorkflowResponseDto>(`/v2/workflows/${workflowId}`, patchWorkflowDto);
  };

  const deleteWorkflow = async (workflowId: string): Promise<NovuRestResult<void, HttpError>> => {
    return await baseClient.safeDelete(`/v2/workflows/${workflowId}`);
  };

  const searchWorkflows = async (
    queryParams: GetListQueryParams
  ): Promise<NovuRestResult<ListWorkflowResponse, HttpError>> => {
    const query = new URLSearchParams();
    query.append('offset', queryParams.offset?.toString() || '0');
    query.append('limit', queryParams.limit?.toString() || '50');
    if (queryParams.orderDirection) {
      query.append('orderDirection', queryParams.orderDirection);
    }
    if (queryParams.orderByField) {
      query.append('orderByField', queryParams.orderByField);
    }
    if (queryParams.query) {
      query.append('query', queryParams.query);
    }

    return await baseClient.safeGet<ListWorkflowResponse>(`/v2/workflows?${query.toString()}`);
  };

  const generatePreview = async (
    workflowId: string,
    stepDatabaseId: string,
    generatePreviewDto: GeneratePreviewRequestDto
  ): Promise<NovuRestResult<GeneratePreviewResponseDto, HttpError>> => {
    return await baseClient.safePost<GeneratePreviewResponseDto>(
      `/v2/workflows/${workflowId}/step/${stepDatabaseId}/preview`,
      generatePreviewDto
    );
  };

  const getWorkflowTestData = async (
    workflowId: string
  ): Promise<NovuRestResult<WorkflowTestDataResponseDto, HttpError>> => {
    return await baseClient.safeGet<WorkflowTestDataResponseDto>(`/v2/workflows/${workflowId}/test-data`);
  };

  return {
    generatePreview,
    createWorkflow,
    updateWorkflow,
    syncWorkflow,
    getWorkflow,
    deleteWorkflow,
    searchWorkflows,
    getWorkflowTestData,
    getWorkflowStepData,
    patchWorkflowStepData,
    patchWorkflow,
  };
};
