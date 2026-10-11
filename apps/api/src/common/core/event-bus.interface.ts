export interface IEventBus {
  publish(eventName: string, payload: any): Promise<void>;
}
