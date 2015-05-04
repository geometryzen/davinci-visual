module visual {
  /**
   * An interface representing a stopwatch.
   */
  export interface IStopwatch {
    /**
     * The `start` method puts the anumation runner into the running state.
     */
    start(): void;
    /**
     * The `stop` method pauses the animation runner from the running state.
     */
    stop(): void;
    /**
     * The `reset` method sets the time to zero from the paused state.
     */
    reset(): void;
    /**
     *The `lap` method records the time in the running state.
     */
    lap(): void;
    /**
     * The readonly `time` property contains the elapsed time on the animation runner.
     */
    time: number;
    /**
     * The readonly `isRunning` property determines whether the animation runner is running.
     */
    isRunning: boolean;
    /**
     * The readonly `isPaused` property determines whether the animation runner as been paused.
     */
    isPaused: boolean;
  }
}