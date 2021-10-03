# Os_SchedulingAlgo_Project
## Aim
Implementation of First come first serve and Shortest job first-preemptive scheduling algorithm and showing the results in a Gantt Chart in a website
## Description
### Scheduling algorithms:
CPU scheduling is a process which allows one process to use the CPU while the execution of another process is on hold(in waiting state) due to unavailability of any resource like I/O etc, thereby making full use of CPU. The aim of CPU scheduling is to make the system efficient, fast and fair.
Whenever the CPU becomes idle, the operating system must select one of the processes in the ready queue to be executed. The selection process is carried out by the short-term scheduler (or CPU scheduler). The scheduler selects from among the processes in memory that are ready to execute, and allocates the CPU to one of them.

### First come first serve Scheduling algorithm:
In the "First come first serve" scheduling algorithm, as the name suggests, the process which arrives first, gets executed first, or we can say that the process which requests the CPU first, gets the CPU allocated first.
First Come First Serve, is just like FIFO(First in First out) Queue data structure, where the data element which is added to the queue first, is the one who leaves the queue first.
It's easy to understand and implement programmatically, using a Queue data structure, where a new process enters through the tail of the queue, and the scheduler selects process from the head of the queue.
A perfect real life example of FCFS scheduling is buying tickets at ticket counter.


### Shortest job first scheduling algorithm:
Shortest Job First scheduling works on the process with the shortest burst time or duration first.
This is the best approach to minimize waiting time. 

It is of two types:
* Non Pre-emptive
* Pre-emptive

To successfully implement it, the burst time/duration time of the processes should be known to the processor in advance, which is practically not feasible all the time.
This scheduling algorithm is optimal if all the jobs/processes are available at the same time. (either Arrival time is 0 for all, or Arrival time is same for all)

### Shortest job first scheduling- Preemptive:
Preemptive scheduling is used when a process switches from running state to ready state or from waiting state to ready state. The resources (mainly CPU cycles) are allocated to the process for the limited amount of time and then is taken away, and the process is again placed back in the ready queue if that process still has CPU burst time remaining. That process stays in ready queue till it gets next chance to execute.

## Language Used
* HTML
* CSS
* JS

