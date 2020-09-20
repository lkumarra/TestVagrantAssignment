from tkinter import *
from tkinter import ttk
import subprocess
import shlex
import signal
import threading
try:
    from ctypes import windll
    windll.shcore.SetProcessDpiAwareness(1)
except:
    pass

#Decorator
def start_thraed():
    '''Decorator for Threading implementation'''
    def start_func(func):
        def func_wrapper(*arg):
            thread = threading.Thread(target = func, args = [*arg])
            thread.start()
            return thread
        return func_wrapper
    return start_func

class ScriptRunner:
    
    def __init__(self, obj):
        self.root = obj
        self.root.title("TestVagrant Script Runner")
        self.root.geometry("1280x720")
        self.root.iconphoto(True, PhotoImage(master=self.root,file = "TestVegrant.PNG"))
        self.style = ttk.Style(self.root)
        self.style.theme_use("clam")
        self.pm = PanedWindow(self.root, orient = VERTICAL, sashpad = 4, sashrelief = 'raised', sashwidth = 6)
        self.console_frame = Frame(self.root, padx = 3, pady = 3)
        self.console_frame.rowconfigure(0, weight = 1)
        self.console_frame.columnconfigure(0, weight = 1)
        self.pm.add(self.console_frame)
        self.pm.paneconfigure(self.console_frame, minsize=135)
        self.label_frame = LabelFrame(self.console_frame, text = "Script Output", padx = 5, pady = 5, font = "TkHeadingFont", background = "white smoke")
        self.button_frame = LabelFrame(self.console_frame, text = "Buttons", padx = 5, pady = 5, font = "TkHeadingFont", background = "white smoke")
        self.scrolled_text = Text(self.label_frame, state = "normal", wrap = "none", borderwidth = 0, height = 28, width = 35)
        self.start_button = Button(self.button_frame, text = "Start", bg = "lime green", command =lambda:self.start_execution() ,width=10, padx = 5, pady = 5, foreground="white")
        self.stop_button = Button(self.button_frame, text = "Stop", bg = "orange Red", command =lambda:self.stop_execution(), width=10, padx = 5, pady = 5, foreground="snow")
        self.install_button = Button(self.button_frame, text = "Install Lib", bg = "gold", command = lambda:self.install_library(), width=10, padx = 5, pady = 5, foreground="Red")
        self.update_button = Button(self.button_frame, text = "Binary Update", bg = "RoyalBlue1", command = lambda:self.webdriver_update(),width=10, padx = 5, pady = 5, foreground="white")
        self.image = PhotoImage(file="TestVegrant.PNG")
        self.label = Label(self.button_frame, image = self.image, background = "white")
        self.text_vsb = Scrollbar(self.label_frame, orient ="vertical", command = self.scrolled_text.yview, background = "gray21")
        self.text_hsb = Scrollbar(self.label_frame, orient ="horizontal", command = self.scrolled_text.xview, background = "gray21")
        self.scrolled_text.configure(yscrollcommand = self.text_vsb.set, xscrollcommand = self.text_hsb.set)
        self.scrolled_text.grid(row = 0, column = 0, sticky = N+S+W+E)
        self.text_vsb.grid(row = 0, column = 1, sticky = "ns")
        self.text_hsb.grid(row = 1, column = 0, sticky = "ew")
        self.scrolled_text.configure(font="TkFixedFont", background = "black")
        self.label_frame.rowconfigure(1, weight=1)
        self.label_frame.columnconfigure(0, weight = 1)
        self.label_frame.grid(row = 0, column = 0, sticky = E+W+N+S)
        self.button_frame.grid(row =0, column = 1, sticky = E+W+N+S)
        self.label.pack(side = TOP, padx = 5, pady = 5, fill = "both", expand = "True")
        # self.start_button.grid(row = 1, column = 0, padx = 5, pady = 5)
        self.start_button.pack(side = TOP, padx = 5, pady = 5)
        # self.stop_button.grid(row = 2, column = 0, padx = 5, pady = 5)
        self.stop_button.pack(side = TOP, padx = 5, pady = 5)
        # self.install_button.grid(row = 3, column = 0, padx = 5, pady = 5)
        self.install_button.pack(side = TOP,  padx = 5, pady = 5)
        # self.update_button.grid(row = 4, column = 0, padx = 5, pady = 5)
        self.update_button.pack(side = TOP,  padx = 5, pady = 5)
        self.scrolled_text.tag_config("DEBUG", foreground ="RoyalBlue1")
        self.scrolled_text.tag_config("DEFAULT", foreground ="snow")
        self.scrolled_text.tag_config("STOP", foreground = "Red", font = "bold")
        self.scrolled_text.tag_config("RUNNINGIT", foreground ="cyan")
        self.scrolled_text.tag_config("RUNNINGTEST", foreground ="slate blue")
        self.scrolled_text.tag_config("SUCCESS", foreground ="SpringGreen2")
        self.scrolled_text.tag_config("FAILED", foreground ="Red2")
        self.scrolled_text.tag_config("PASSED", foreground = "SpringGreen2")
        self.scrolled_text.tag_config("FAILURES", foreground = "Red2", font="bold")
        self.pm.pack(fill = BOTH, expand = 1)
        self.process = None
        
    @start_thraed()
    def start_execution(self):
        '''Send a coommand to start execution and send output to console'''
        self.process = subprocess.Popen(shlex.split("npm run test"), stdout=subprocess.PIPE, shell=True)
        while True:
            output = self.process.stdout.readline()
            if output == '' and self.process.poll() is not None:
                break
            if output:
                string_output = str(output.strip())
                if "DEBUG" in string_output:
                    self.scrolled_text.insert(END, output.strip(), "DEBUG")
                elif "Running IT" in string_output:
                    self.scrolled_text.insert(END, output.strip(), "RUNNINGIT")
                elif "Running test:" in string_output:
                    self.scrolled_text.insert(END, output.strip(), "RUNNINGTEST")
                elif "SUCCESS" in string_output:
                    self.scrolled_text.insert(END, output.strip(), "SUCCESS")
                elif "FAILED" in string_output:
                    self.scrolled_text.insert(END, output.strip(), "FAILED")
                elif "Failures" in string_output:
                    self.scrolled_text.insert(END, output.strip(), "FAILURES")
                elif "Failed" in string_output:
                    self.scrolled_text.insert(END, output.strip(), "FAILED")
                elif '32m' in string_output:
                    self.scrolled_text.insert(END, output.strip(), "PASSED")
                elif '31m' in string_output:
                    self.scrolled_text.insert(END, output.strip(), "FAILED")
                else:
                    self.scrolled_text.insert(END, output.strip(), "DEFAULT")
                self.scrolled_text.insert(END, "\n", "DEBUG")
    
    @start_thraed()
    def install_library(self):
        '''Send a command to install all dependencies and send output to console'''
        install_process = subprocess.Popen(shlex.split("npm install"), stdout=subprocess.PIPE, shell=True)
        while True:
            output = install_process.stdout.readline()
            if output == '' and install_process.poll() is not None:
                break
            if output:
                self.scrolled_text.insert(END, output.strip(), "DEFAULT")
                self.scrolled_text.insert(END, "\n", "DEBUG")

    @start_thraed()
    def webdriver_update(self):
        '''Send a command to Update Webdriver and send output to console'''
        update_process = subprocess.Popen(shlex.split("npm run webdrivermanager:update"), stdout=subprocess.PIPE, shell=True)
        while True:
            output = update_process.stdout.readline()
            if output == '' and update_process.poll() is not None:
                break
            if output:
                self.scrolled_text.insert(END, output.strip(), "DEFAULT")
                self.scrolled_text.insert(END, "\n", "DEBUG")

    @start_thraed()
    def stop_execution(self):
        '''Send a command to stop execution'''
        self.process.send_signal(signal.CTRL_BREAK_EVENT)


if __name__ == "__main__":
    root = Tk()
    ScriptRunner(root)
    root.mainloop()
    
        